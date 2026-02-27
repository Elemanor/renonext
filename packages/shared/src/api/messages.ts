import { supabase } from './supabase';
import type { Conversation, Message, MessageType } from '../types/message';

export async function getConversations(
  userId: string
): Promise<Conversation[]> {
  const { data, error } = await supabase
    .from('conversations')
    .select(
      `
      *,
      participants:conversation_participants(
        *,
        profile:profiles(*)
      )
    `
    )
    .order('updated_at', { ascending: false });

  if (error) throw error;

  // Filter to only conversations where the user is a participant
  const userConversations = (data ?? []).filter((conv: Conversation & { participants?: Array<{ user_id: string }> }) =>
    conv.participants?.some((p) => p.user_id === userId)
  );

  // Fetch last message and unread count for each conversation
  const enriched = await Promise.all(
    userConversations.map(async (conv: Conversation) => {
      const { data: messages } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conv.id)
        .order('created_at', { ascending: false })
        .limit(1);

      const { count } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('conversation_id', conv.id)
        .eq('is_read', false)
        .neq('sender_id', userId);

      return {
        ...conv,
        last_message: messages?.[0] ?? undefined,
        unread_count: count ?? 0,
      };
    })
  );

  return enriched as Conversation[];
}

export async function getMessages(
  conversationId: string,
  limit: number = 50,
  before?: string
): Promise<Message[]> {
  let query = supabase
    .from('messages')
    .select(
      `
      *,
      sender:profiles!messages_sender_id_fkey(*)
    `
    )
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (before) {
    query = query.lt('created_at', before);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).reverse() as Message[];
}

export async function sendMessage(data: {
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type?: MessageType;
  metadata?: Record<string, unknown>;
}): Promise<Message> {
  const { data: message, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: data.conversation_id,
      sender_id: data.sender_id,
      content: data.content,
      message_type: data.message_type ?? 'text',
      metadata: data.metadata ?? {},
      is_read: false,
    })
    .select(
      `
      *,
      sender:profiles!messages_sender_id_fkey(*)
    `
    )
    .single();
  if (error) throw error;

  // Update conversation timestamp
  await supabase
    .from('conversations')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', data.conversation_id);

  return message as Message;
}

export async function createConversation(
  participantIds: string[],
  jobId?: string
): Promise<Conversation> {
  // Check if conversation already exists between these participants for this job
  if (jobId && participantIds.length === 2) {
    const { data: existing } = await supabase
      .from('conversations')
      .select(
        `
        *,
        participants:conversation_participants(user_id)
      `
      )
      .eq('job_id', jobId);

    const existingConv = existing?.find(
      (conv: Conversation & { participants?: Array<{ user_id: string }> }) =>
        conv.participants?.length === 2 &&
        participantIds.every((id) =>
          conv.participants?.some((p) => p.user_id === id)
        )
    );

    if (existingConv) {
      return existingConv as Conversation;
    }
  }

  const { data: conversation, error: convError } = await supabase
    .from('conversations')
    .insert({ job_id: jobId ?? null })
    .select()
    .single();
  if (convError) throw convError;

  const participants = participantIds.map((userId) => ({
    conversation_id: conversation.id,
    user_id: userId,
  }));

  const { error: partError } = await supabase
    .from('conversation_participants')
    .insert(participants);
  if (partError) throw partError;

  return conversation as Conversation;
}

export async function markAsRead(
  conversationId: string,
  userId: string
): Promise<void> {
  // Mark all messages in this conversation as read (except user's own)
  const { error: msgError } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('conversation_id', conversationId)
    .neq('sender_id', userId)
    .eq('is_read', false);
  if (msgError) throw msgError;

  // Update last_read_at on participant record
  const { error: partError } = await supabase
    .from('conversation_participants')
    .update({ last_read_at: new Date().toISOString() })
    .eq('conversation_id', conversationId)
    .eq('user_id', userId);
  if (partError) throw partError;
}
