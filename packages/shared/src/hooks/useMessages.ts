import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as messagesApi from '../api/messages';
import { useAuthStore } from '../stores/authStore';

const messageKeys = {
  all: ['messages'] as const,
  conversations: (userId: string) =>
    [...messageKeys.all, 'conversations', userId] as const,
  messages: (conversationId: string) =>
    [...messageKeys.all, 'thread', conversationId] as const,
};

export function useConversations() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: messageKeys.conversations(userId ?? ''),
    queryFn: () => messagesApi.getConversations(userId!),
    enabled: Boolean(userId),
    refetchInterval: 30000, // Refetch every 30 seconds as fallback
  });
}

export function useMessages(conversationId: string | undefined) {
  return useQuery({
    queryKey: messageKeys.messages(conversationId ?? ''),
    queryFn: () => messagesApi.getMessages(conversationId!),
    enabled: Boolean(conversationId),
    refetchInterval: 10000, // Refetch every 10 seconds as fallback
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation({
    mutationFn: (data: {
      conversation_id: string;
      content: string;
      message_type?: 'text' | 'image' | 'system' | 'bid_update' | 'job_update';
      metadata?: Record<string, unknown>;
    }) =>
      messagesApi.sendMessage({
        ...data,
        sender_id: userId!,
      }),
    onSuccess: (newMessage) => {
      // Optimistically add the message to the cache
      queryClient.setQueryData(
        messageKeys.messages(newMessage.conversation_id),
        (old: Awaited<ReturnType<typeof messagesApi.getMessages>> | undefined) => {
          if (!old) return [newMessage];
          return [...old, newMessage];
        }
      );
      // Refresh conversations list to update last_message
      queryClient.invalidateQueries({
        queryKey: messageKeys.conversations(userId ?? ''),
      });
    },
  });
}

export function useCreateConversation() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation({
    mutationFn: ({
      participantIds,
      jobId,
    }: {
      participantIds: string[];
      jobId?: string;
    }) => messagesApi.createConversation(participantIds, jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: messageKeys.conversations(userId ?? ''),
      });
    },
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation({
    mutationFn: (conversationId: string) =>
      messagesApi.markAsRead(conversationId, userId!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: messageKeys.conversations(userId ?? ''),
      });
    },
  });
}
