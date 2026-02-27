import type { Profile } from './user';

export type MessageType = 'text' | 'image' | 'system' | 'bid_update' | 'job_update';

export type NotificationType =
  | 'new_bid'
  | 'bid_accepted'
  | 'bid_rejected'
  | 'job_started'
  | 'job_completed'
  | 'new_message'
  | 'new_review'
  | 'payment_received'
  | 'payment_sent'
  | 'job_cancelled'
  | 'progress_update'
  | 'system';

export interface Conversation {
  id: string;
  job_id: string | null;
  created_at: string;
  updated_at: string;
  // Joined / computed fields
  participants?: ConversationParticipant[];
  last_message?: Message;
  unread_count?: number;
}

export interface ConversationParticipant {
  id: string;
  conversation_id: string;
  user_id: string;
  last_read_at: string | null;
  created_at: string;
  // Joined fields
  profile?: Profile;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: MessageType;
  metadata: Record<string, unknown>;
  is_read: boolean;
  created_at: string;
  // Joined fields
  sender?: Profile;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  body: string;
  data: Record<string, unknown>;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
}
