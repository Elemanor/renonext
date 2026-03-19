import { NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify conversation belongs to user
    const { data: conv } = await supabase
      .from('chat_conversations')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (!conv) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const { data: messages, error } = await supabase
      .from('chat_messages')
      .select('id, role, content, sources, created_at')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(messages);
  } catch {
    return Response.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('chat_conversations')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return new Response(null, { status: 204 });
  } catch {
    return Response.json({ error: 'Failed to delete conversation' }, { status: 500 });
  }
}
