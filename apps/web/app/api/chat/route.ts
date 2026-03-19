import { NextRequest } from 'next/server';
import { streamText, type UIMessage } from 'ai';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { hybridSearch, buildContext, buildSourceCitations } from '@/lib/ai/search';
import { SYSTEM_PROMPT } from '@/lib/ai/system-prompt';
import { AI_CONFIG } from '@/lib/ai/config';
import { createHash } from 'crypto';

const deepseek = createDeepSeek({ apiKey: process.env.DEEPSEEK_API_KEY });

/** Extract plain text from UIMessage parts */
function getMessageText(msg: UIMessage): string {
  if (!msg.parts) return '';
  return msg.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('');
}

async function checkRateLimit(
  userId: string | null,
  ipHash: string
): Promise<{ allowed: boolean; remaining: number }> {
  const admin = createSupabaseAdminClient();
  const windowStart = new Date(Date.now() - AI_CONFIG.rateLimitWindowMs).toISOString();
  const limit = userId ? AI_CONFIG.authenticatedRateLimit : AI_CONFIG.anonymousRateLimit;

  const filter = userId
    ? { user_id: userId }
    : { ip_hash: ipHash };

  const { data: existing } = await admin
    .from('chat_rate_limits')
    .select('*')
    .match(filter)
    .single();

  if (existing && new Date(existing.window_start) > new Date(windowStart)) {
    if (existing.message_count >= limit) {
      return { allowed: false, remaining: 0 };
    }
    await admin
      .from('chat_rate_limits')
      .update({ message_count: existing.message_count + 1 })
      .eq('id', existing.id);
    return { allowed: true, remaining: limit - existing.message_count - 1 };
  }

  if (existing) {
    await admin
      .from('chat_rate_limits')
      .update({ message_count: 1, window_start: new Date().toISOString() })
      .eq('id', existing.id);
  } else {
    await admin.from('chat_rate_limits').insert({
      ...filter,
      message_count: 1,
      window_start: new Date().toISOString(),
    });
  }

  return { allowed: true, remaining: limit - 1 };
}

export async function POST(request: NextRequest) {
  try {
    const { messages, conversationId, anonymousId } = await request.json() as {
      messages: UIMessage[];
      conversationId?: string;
      anonymousId?: string;
    };

    if (!messages?.length) {
      return Response.json({ error: 'Messages required' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const lastUserText = getMessageText(lastMessage);
    if (!lastUserText) {
      return Response.json({ error: 'Invalid message' }, { status: 400 });
    }

    // Auth check
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id ?? null;

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const ipHash = createHash('sha256').update(ip).digest('hex').slice(0, 16);
    const { allowed, remaining } = await checkRateLimit(userId, ipHash);

    if (!allowed) {
      return Response.json(
        { error: 'Rate limit exceeded. Please try again tomorrow.' },
        { status: 429 }
      );
    }

    // Hybrid search for context
    const searchResults = await hybridSearch(lastUserText, userId);
    const context = buildContext(searchResults);
    const sources = buildSourceCitations(searchResults);

    // Build system message with context
    const systemMessage = context
      ? `${SYSTEM_PROMPT}\n\n${context}`
      : SYSTEM_PROMPT;

    // Ensure conversation exists
    const admin = createSupabaseAdminClient();
    let convId = conversationId;

    if (!convId) {
      const title = lastUserText.slice(0, 100) + (lastUserText.length > 100 ? '...' : '');
      const { data: conv } = await admin
        .from('chat_conversations')
        .insert({
          user_id: userId,
          anonymous_id: userId ? null : (anonymousId || null),
          title,
        })
        .select('id')
        .single();
      convId = conv?.id;
    }

    // Save user message
    if (convId) {
      await admin.from('chat_messages').insert({
        conversation_id: convId,
        role: 'user',
        content: lastUserText,
      });
      await admin
        .from('chat_conversations')
        .update({
          message_count: messages.length,
          updated_at: new Date().toISOString(),
        })
        .eq('id', convId);
    }

    // Convert UIMessages to CoreMessages for streamText
    const coreMessages = messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: getMessageText(m),
    }));

    // Stream response from Claude
    const result = streamText({
      model: deepseek(AI_CONFIG.model),
      system: systemMessage,
      messages: coreMessages,
      maxOutputTokens: AI_CONFIG.maxTokens,
      temperature: AI_CONFIG.temperature,
      async onFinish({ text }) {
        if (convId) {
          await admin.from('chat_messages').insert({
            conversation_id: convId,
            role: 'assistant',
            content: text,
            sources: JSON.stringify(sources),
          });
        }
      },
    });

    const response = result.toUIMessageStreamResponse();

    // Add custom headers
    const headers = new Headers(response.headers);
    headers.set('X-Conversation-Id', convId || '');
    headers.set('X-Rate-Limit-Remaining', String(remaining));
    headers.set('X-Sources', JSON.stringify(sources));

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
