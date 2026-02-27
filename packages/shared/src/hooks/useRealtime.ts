import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../api/supabase';
import type { Job, JobProgress } from '../types/job';
import type { Message, Notification } from '../types/message';

/**
 * Subscribe to realtime updates for a specific job.
 * Automatically updates the React Query cache when changes come through.
 */
export function useRealtimeJob(jobId: string | undefined) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!jobId) return;

    const channel = supabase
      .channel(`job:${jobId}`)
      .on<Job>(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'jobs',
          filter: `id=eq.${jobId}`,
        },
        (payload) => {
          queryClient.setQueryData(
            ['jobs', 'detail', jobId],
            (old: Job | undefined) => {
              if (!old) return payload.new;
              return { ...old, ...payload.new };
            }
          );
          queryClient.invalidateQueries({ queryKey: ['jobs', 'list'] });
        }
      )
      .on<JobProgress>(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'job_progress',
          filter: `job_id=eq.${jobId}`,
        },
        (payload) => {
          queryClient.setQueryData(
            ['jobs', 'progress', jobId],
            (old: JobProgress[] | undefined) => {
              if (!old) return [payload.new];
              return [...old, payload.new];
            }
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'job_bids',
          filter: `job_id=eq.${jobId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ['bids', 'job', jobId],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [jobId, queryClient]);
}

/**
 * Subscribe to realtime messages in a conversation.
 * Automatically adds new messages to the React Query cache.
 */
export function useRealtimeMessages(conversationId: string | undefined) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on<Message>(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          queryClient.setQueryData(
            ['messages', 'thread', conversationId],
            (old: Message[] | undefined) => {
              if (!old) return [payload.new];
              // Avoid duplicates (in case optimistic update already added it)
              const exists = old.some((m) => m.id === payload.new.id);
              if (exists) return old;
              return [...old, payload.new];
            }
          );
          // Refresh conversations to update last_message and unread count
          queryClient.invalidateQueries({
            queryKey: ['messages', 'conversations'],
          });
        }
      )
      .on<Message>(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          queryClient.setQueryData(
            ['messages', 'thread', conversationId],
            (old: Message[] | undefined) => {
              if (!old) return old;
              return old.map((m) =>
                m.id === payload.new.id ? { ...m, ...payload.new } : m
              );
            }
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, queryClient]);
}

/**
 * Subscribe to realtime notifications for a user.
 * Provides a callback for each new notification so the UI can show alerts.
 */
export function useRealtimeNotifications(
  userId: string | undefined,
  onNotification?: (notification: Notification) => void
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on<Notification>(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          // Invalidate any notification queries
          queryClient.invalidateQueries({
            queryKey: ['notifications', userId],
          });

          // Call the notification handler so UI can display a toast / push
          if (onNotification) {
            onNotification(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient, onNotification]);
}
