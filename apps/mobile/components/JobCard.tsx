import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Job } from '@renonext/shared';
import { Badge } from '@renonext/ui/Badge';

interface JobCardProps {
  job: Job;
}

const STATUS_BADGE: Record<string, { variant: any; label: string }> = {
  draft: { variant: 'neutral', label: 'Draft' },
  posted: { variant: 'info', label: 'Posted' },
  bidding: { variant: 'info', label: 'Bidding' },
  accepted: { variant: 'warning', label: 'Accepted' },
  in_progress: { variant: 'warning', label: 'In Progress' },
  completed: { variant: 'success', label: 'Completed' },
  cancelled: { variant: 'error', label: 'Cancelled' },
  disputed: { variant: 'error', label: 'Disputed' },
};

export default function JobCard({ job }: JobCardProps) {
  const statusInfo = STATUS_BADGE[job.status] ?? { variant: 'neutral', label: job.status };

  return (
    <View
      className="bg-white rounded-2xl overflow-hidden"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {/* Photo Thumbnail */}
      {job.photos && job.photos.length > 0 && (
        <View className="h-36 bg-gray-100 relative">
          <Image
            source={{ uri: job.photos[0] }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Gradient overlay */}
          <View className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30" />
          {/* Urgent flag on image */}
          {job.is_urgent && (
            <View className="absolute top-2.5 left-2.5 flex-row items-center bg-red-500 rounded-lg px-2.5 py-1">
              <Ionicons name="alert-circle" size={12} color="#ffffff" />
              <Text className="text-xs text-white font-bold ml-1">Urgent</Text>
            </View>
          )}
        </View>
      )}

      <View className="p-4">
        {/* Header Row */}
        <View className="flex-row items-center justify-between mb-1.5">
          {job.category && (
            <Badge variant="info" label={job.category.name} size="sm" />
          )}
          <Badge variant={statusInfo.variant} label={statusInfo.label} size="sm" />
        </View>

        {/* Title */}
        <Text className="text-base font-bold text-gray-900 mt-1" numberOfLines={2}>
          {job.title}
        </Text>

        {/* Location & Date */}
        <View className="flex-row items-center mt-2.5 gap-4">
          <View className="flex-row items-center">
            <Ionicons name="location" size={13} color="#9CA3AF" />
            <Text className="text-xs text-gray-500 ml-1 font-medium" numberOfLines={1}>
              {job.city}, {job.province}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="calendar" size={13} color="#9CA3AF" />
            <Text className="text-xs text-gray-500 ml-1 font-medium">
              {new Date(job.created_at).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Price Range */}
        {(job.budget_min != null || job.budget_max != null) && (
          <View className="flex-row items-center mt-2.5 bg-secondary-50 rounded-lg px-2.5 py-1.5 self-start">
            <Ionicons name="cash" size={14} color="#059669" />
            <Text className="text-sm font-bold text-secondary-700 ml-1.5">
              ${job.budget_min ?? '?'} - ${job.budget_max ?? '?'}
            </Text>
          </View>
        )}

        {/* Urgent flag for cards without photos */}
        {job.is_urgent && !(job.photos && job.photos.length > 0) && (
          <View className="flex-row items-center mt-2 bg-red-50 rounded-lg px-2.5 py-1.5 self-start">
            <Ionicons name="alert-circle" size={14} color="#EF4444" />
            <Text className="text-xs text-red-600 font-bold ml-1">Urgent</Text>
          </View>
        )}
      </View>
    </View>
  );
}
