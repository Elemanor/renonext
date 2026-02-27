import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getJobProgress } from '@renonext/shared/api/jobs';
import { supabase } from '@renonext/shared/api/supabase';
import type { JobProgress } from '@renonext/shared';
import { ProgressTimeline, type TimelineItem } from '@renonext/ui/ProgressTimeline';
import { Badge } from '@renonext/ui/Badge';
import EmptyState from '../../components/EmptyState';

export default function JobProgressScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const [progressItems, setProgressItems] = useState<JobProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProgress = useCallback(async () => {
    try {
      if (!jobId) return;
      const data = await getJobProgress(jobId);
      setProgressItems(data);
    } catch {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchProgress();

    const channel = supabase
      .channel(`job-progress-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'job_progress',
          filter: `job_id=eq.${jobId}`,
        },
        (payload) => {
          setProgressItems((prev) => [...prev, payload.new as JobProgress]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProgress, jobId]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProgress();
    setRefreshing(false);
  }, [fetchProgress]);

  const timelineItems: TimelineItem[] = progressItems.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description ?? undefined,
    timestamp: item.created_at,
    type: item.update_type,
    photos: item.photos,
  }));

  const currentIndex = progressItems.length > 0 ? progressItems.length - 1 : 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Header Card */}
        <View
          className="bg-white rounded-2xl p-5 mb-4"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className={`w-11 h-11 rounded-xl items-center justify-center mr-3 ${
                progressItems.length > 0 ? 'bg-secondary-50' : 'bg-blue-50'
              }`}>
                <Ionicons
                  name={progressItems.length > 0 ? 'pulse-outline' : 'hourglass-outline'}
                  size={22}
                  color={progressItems.length > 0 ? '#059669' : '#2563EB'}
                />
              </View>
              <View>
                <Text className="text-lg font-bold text-gray-900">Job Progress</Text>
                <Text className="text-sm text-gray-500">
                  {progressItems.length} update{progressItems.length !== 1 ? 's' : ''}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-2">
              {progressItems.length > 0 && (
                <View className="flex-row items-center bg-secondary-50 px-3 py-1.5 rounded-full">
                  <View className="w-2 h-2 bg-secondary-500 rounded-full mr-1.5" />
                  <Text className="text-xs font-semibold text-secondary-700">Live</Text>
                </View>
              )}
              <Badge
                variant={progressItems.length > 0 ? 'success' : 'info'}
                label={progressItems.length > 0 ? 'Active' : 'Waiting'}
              />
            </View>
          </View>
        </View>

        {/* Milestone Summary */}
        {progressItems.length > 0 && (
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1 bg-white rounded-2xl p-4 items-center">
              <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center mb-2">
                <Ionicons name="flag-outline" size={18} color="#2563EB" />
              </View>
              <Text className="text-lg font-bold text-gray-900">
                {progressItems.filter((p) => p.update_type === 'milestone').length}
              </Text>
              <Text className="text-xs text-gray-500">Milestones</Text>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 items-center">
              <View className="w-10 h-10 bg-purple-50 rounded-xl items-center justify-center mb-2">
                <Ionicons name="images-outline" size={18} color="#8B5CF6" />
              </View>
              <Text className="text-lg font-bold text-gray-900">
                {progressItems.reduce((sum, p) => sum + (p.photos?.length ?? 0), 0)}
              </Text>
              <Text className="text-xs text-gray-500">Photos</Text>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 items-center">
              <View className="w-10 h-10 bg-amber-50 rounded-xl items-center justify-center mb-2">
                <Ionicons name="time-outline" size={18} color="#D97706" />
              </View>
              <Text className="text-xs font-bold text-gray-900">
                {progressItems.length > 0
                  ? new Date(progressItems[progressItems.length - 1].created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : '--'}
              </Text>
              <Text className="text-xs text-gray-500">Last Update</Text>
            </View>
          </View>
        )}

        {/* Timeline */}
        {timelineItems.length > 0 ? (
          <View
            className="bg-white rounded-2xl p-5"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 3,
              elevation: 1,
            }}
          >
            <ProgressTimeline items={timelineItems} currentIndex={currentIndex} />
          </View>
        ) : isLoading ? (
          <View className="items-center py-16">
            <Text className="text-gray-400">Loading progress...</Text>
          </View>
        ) : (
          <EmptyState
            icon="time-outline"
            title="No Updates Yet"
            description="Progress updates will appear here once the pro starts working on your job."
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
