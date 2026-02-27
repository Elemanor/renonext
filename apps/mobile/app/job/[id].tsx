import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@renonext/shared/api/supabase';
import { getJob } from '@renonext/shared/api/jobs';
import type { Job } from '@renonext/shared';
import { Badge } from '@renonext/ui/Badge';
import { Button } from '@renonext/ui/Button';
import { Avatar } from '@renonext/ui/Avatar';
import LoadingScreen from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';

const STATUS_CONFIG: Record<string, { variant: any; label: string; bg: string; icon: string }> = {
  draft: { variant: 'neutral', label: 'Draft', bg: 'bg-gray-50', icon: 'document-outline' },
  posted: { variant: 'info', label: 'Posted', bg: 'bg-blue-50', icon: 'megaphone-outline' },
  bidding: { variant: 'info', label: 'Receiving Bids', bg: 'bg-blue-50', icon: 'people-outline' },
  accepted: { variant: 'warning', label: 'Accepted', bg: 'bg-amber-50', icon: 'handshake-outline' },
  in_progress: { variant: 'warning', label: 'In Progress', bg: 'bg-amber-50', icon: 'construct-outline' },
  completed: { variant: 'success', label: 'Completed', bg: 'bg-green-50', icon: 'checkmark-circle-outline' },
  cancelled: { variant: 'error', label: 'Cancelled', bg: 'bg-red-50', icon: 'close-circle-outline' },
  disputed: { variant: 'error', label: 'Disputed', bg: 'bg-red-50', icon: 'warning-outline' },
};

type TabKey = 'details' | 'bids' | 'progress' | 'materials';

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('details');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (!id) throw new Error('No job ID');
        const { data: { user } } = await supabase.auth.getUser();
        setCurrentUserId(user?.id ?? null);
        const jobData = await getJob(id);
        setJob(jobData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load job');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (isLoading) return <LoadingScreen message="Loading job details..." />;
  if (error || !job) return <ErrorScreen message={error ?? 'Job not found'} onRetry={() => router.back()} />;

  const isClient = currentUserId === job.client_id;
  const isAssignedPro = currentUserId === job.assigned_pro_id;
  const statusInfo = STATUS_CONFIG[job.status] ?? { variant: 'neutral', label: job.status, bg: 'bg-gray-50', icon: 'help-outline' };
  const bidCount = job.bids?.length ?? 0;

  const tabs: { key: TabKey; label: string; icon: string; badge?: number }[] = [
    { key: 'details', label: 'Details', icon: 'document-text-outline' },
    { key: 'bids', label: 'Bids', icon: 'list-outline', badge: bidCount },
    { key: 'progress', label: 'Progress', icon: 'time-outline' },
    { key: 'materials', label: 'Materials', icon: 'construct-outline' },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Status Banner */}
        <View className={`${statusInfo.bg} px-6 pt-4 pb-5`}>
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 bg-white/70 rounded-xl items-center justify-center mr-3">
              <Ionicons name={statusInfo.icon as any} size={22} color="#374151" />
            </View>
            <Badge variant={statusInfo.variant} label={statusInfo.label} />
            {job.is_urgent && (
              <Badge variant="error" label="Urgent" size="sm" className="ml-2" />
            )}
          </View>
          <Text className="text-2xl font-bold text-gray-900">{job.title}</Text>
          <View className="flex-row items-center mt-2 gap-2">
            {job.category && (
              <View className="bg-white/70 px-2.5 py-1 rounded-lg">
                <Text className="text-xs font-medium text-gray-600">{job.category.name}</Text>
              </View>
            )}
            <Text className="text-sm text-gray-500">
              Posted {new Date(job.created_at).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View className="bg-white px-4 pt-1 border-b border-gray-100">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-1">
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => {
                    if (tab.key === 'bids') {
                      router.push({ pathname: '/job/bids', params: { jobId: id } });
                    } else if (tab.key === 'progress') {
                      router.push({ pathname: '/job/progress', params: { jobId: id } });
                    } else if (tab.key === 'materials') {
                      router.push({ pathname: '/materials/list', params: { jobId: id } });
                    } else {
                      setActiveTab(tab.key);
                    }
                  }}
                  className={`flex-row items-center px-4 py-3 border-b-2 ${
                    activeTab === tab.key
                      ? 'border-primary-600'
                      : 'border-transparent'
                  }`}
                >
                  <Ionicons
                    name={tab.icon as any}
                    size={16}
                    color={activeTab === tab.key ? '#2563EB' : '#9CA3AF'}
                  />
                  <Text
                    className={`text-sm font-medium ml-1.5 ${
                      activeTab === tab.key ? 'text-primary-600' : 'text-gray-500'
                    }`}
                  >
                    {tab.label}
                  </Text>
                  {tab.badge != null && tab.badge > 0 && (
                    <View className="bg-primary-600 rounded-full ml-1.5 min-w-[20px] h-5 items-center justify-center px-1.5">
                      <Text className="text-xs font-bold text-white">{tab.badge}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Details Tab Content */}
        {activeTab === 'details' && (
          <View className="px-6 pt-4">
            {/* Description */}
            <View className="bg-white rounded-2xl p-4 mb-3">
              <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Description
              </Text>
              <Text className="text-base text-gray-700 leading-6">{job.description}</Text>
            </View>

            {/* Location */}
            <View className="bg-white rounded-2xl p-4 mb-3">
              <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Location
              </Text>
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-primary-50 rounded-lg items-center justify-center mr-3">
                  <Ionicons name="location" size={16} color="#2563EB" />
                </View>
                <Text className="text-sm text-gray-700 flex-1">
                  {job.address}, {job.city}, {job.province} {job.postal_code}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push('/map')}
                className="mt-3 h-28 bg-gray-50 rounded-xl items-center justify-center overflow-hidden"
              >
                <Ionicons name="map-outline" size={28} color="#9CA3AF" />
                <Text className="text-xs text-gray-400 mt-1">Tap to view on map</Text>
              </TouchableOpacity>
            </View>

            {/* Job Details */}
            <View className="bg-white rounded-2xl p-4 mb-3">
              <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Job Info
              </Text>
              <View className="gap-3">
                {job.scheduled_date && (
                  <View className="flex-row items-center">
                    <View className="w-8 h-8 bg-blue-50 rounded-lg items-center justify-center mr-3">
                      <Ionicons name="calendar" size={16} color="#3B82F6" />
                    </View>
                    <View>
                      <Text className="text-xs text-gray-400">Scheduled Date</Text>
                      <Text className="text-sm font-medium text-gray-700">
                        {new Date(job.scheduled_date).toLocaleDateString('en-US', {
                          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                        })}
                      </Text>
                    </View>
                  </View>
                )}
                {job.estimated_hours && (
                  <View className="flex-row items-center">
                    <View className="w-8 h-8 bg-purple-50 rounded-lg items-center justify-center mr-3">
                      <Ionicons name="time" size={16} color="#8B5CF6" />
                    </View>
                    <View>
                      <Text className="text-xs text-gray-400">Estimated Duration</Text>
                      <Text className="text-sm font-medium text-gray-700">
                        {job.estimated_hours} hours
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>

            {/* Budget */}
            {(job.budget_min != null || job.budget_max != null) && (
              <View className="bg-white rounded-2xl p-4 mb-3">
                <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Budget
                </Text>
                <View className="flex-row items-baseline">
                  <Text className="text-2xl font-bold text-secondary-600">
                    ${job.budget_min ?? '?'} - ${job.budget_max ?? '?'}
                  </Text>
                </View>
                {job.total_cost != null && (
                  <View className="flex-row items-center mt-2 bg-green-50 rounded-lg px-3 py-2">
                    <Ionicons name="checkmark-circle" size={16} color="#059669" />
                    <Text className="text-sm font-medium text-green-700 ml-2">
                      Final price: ${job.total_cost.toFixed(2)}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Photos */}
            {job.photos && job.photos.length > 0 && (
              <View className="bg-white rounded-2xl p-4 mb-3">
                <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Photos ({job.photos.length})
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {job.photos.map((photo, i) => (
                    <View
                      key={i}
                      className="w-28 h-28 rounded-xl bg-gray-100 overflow-hidden mr-2"
                    >
                      <Image
                        source={{ uri: photo }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Assigned Pro */}
            {job.assigned_pro && (
              <View className="bg-white rounded-2xl p-4 mb-3">
                <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Assigned Pro
                </Text>
                <TouchableOpacity
                  onPress={() => router.push(`/pro/${job.assigned_pro_id}`)}
                  className="flex-row items-center bg-gray-50 rounded-xl p-3"
                  activeOpacity={0.7}
                >
                  <Avatar
                    name={job.assigned_pro.profile?.full_name ?? 'Pro'}
                    imageUrl={job.assigned_pro.profile?.avatar_url}
                    size="md"
                  />
                  <View className="flex-1 ml-3">
                    <Text className="text-base font-semibold text-gray-900">
                      {job.assigned_pro.profile?.full_name ?? 'Pro'}
                    </Text>
                    <Text className="text-sm text-primary-600">View profile</Text>
                  </View>
                  <View className="flex-row items-center gap-3">
                    <TouchableOpacity
                      className="w-10 h-10 bg-primary-50 rounded-xl items-center justify-center"
                      onPress={() => router.push('/(tabs)/messages')}
                    >
                      <Ionicons name="chatbubble-outline" size={18} color="#2563EB" />
                    </TouchableOpacity>
                    <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        <View className="h-28" />
      </ScrollView>

      {/* Bottom Actions */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        {isClient && (job.status === 'posted' || job.status === 'bidding') && (
          <Button
            variant="primary"
            size="lg"
            onPress={() => router.push({ pathname: '/job/bids', params: { jobId: id } })}
            leftIcon={<Ionicons name="list-outline" size={20} color="#ffffff" />}
          >
            View Bids ({bidCount})
          </Button>
        )}

        {isClient && job.status === 'in_progress' && (
          <View className="flex-row gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onPress={() => router.push({ pathname: '/job/progress', params: { jobId: id } })}
              leftIcon={<Ionicons name="time-outline" size={18} color="#374151" />}
            >
              Progress
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onPress={() => router.push({ pathname: '/job/complete', params: { jobId: id } })}
              leftIcon={<Ionicons name="checkmark-circle-outline" size={18} color="#ffffff" />}
            >
              Complete
            </Button>
          </View>
        )}

        {!isClient && !isAssignedPro && (job.status === 'posted' || job.status === 'bidding') && (
          <Button
            variant="primary"
            size="lg"
            onPress={() => router.push({ pathname: '/job/bids', params: { jobId: id } })}
            leftIcon={<Ionicons name="hand-left-outline" size={20} color="#ffffff" />}
          >
            Place a Bid
          </Button>
        )}

        {isAssignedPro && job.status === 'in_progress' && (
          <Button
            variant="primary"
            size="lg"
            onPress={() => router.push({ pathname: '/job/progress', params: { jobId: id } })}
            leftIcon={<Ionicons name="camera-outline" size={20} color="#ffffff" />}
          >
            Update Progress
          </Button>
        )}
      </View>
    </View>
  );
}
