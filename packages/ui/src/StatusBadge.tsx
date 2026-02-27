import React from 'react';
import { View, Text } from 'react-native';

export type JobStatus =
  | 'posted'
  | 'bidding'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'disputed'
  | 'draft';

export type BidStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'withdrawn'
  | 'expired';

export type StatusBadgeStatus = JobStatus | BidStatus;

export type StatusBadgeSize = 'sm' | 'md';

export interface StatusBadgeProps {
  status: StatusBadgeStatus;
  size?: StatusBadgeSize;
  className?: string;
}

interface StatusConfig {
  label: string;
  bgColor: string;
  textColor: string;
  dotColor: string;
}

const statusMap: Record<StatusBadgeStatus, StatusConfig> = {
  posted: {
    label: 'Posted',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    dotColor: 'bg-blue-500',
  },
  bidding: {
    label: 'Bidding',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    dotColor: 'bg-amber-500',
  },
  in_progress: {
    label: 'In Progress',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    dotColor: 'bg-emerald-500',
  },
  completed: {
    label: 'Completed',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    dotColor: 'bg-green-500',
  },
  cancelled: {
    label: 'Cancelled',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    dotColor: 'bg-red-500',
  },
  disputed: {
    label: 'Disputed',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    dotColor: 'bg-orange-500',
  },
  draft: {
    label: 'Draft',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-600',
    dotColor: 'bg-gray-400',
  },
  pending: {
    label: 'Pending',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    dotColor: 'bg-amber-500',
  },
  accepted: {
    label: 'Accepted',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    dotColor: 'bg-emerald-500',
  },
  rejected: {
    label: 'Rejected',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    dotColor: 'bg-red-500',
  },
  withdrawn: {
    label: 'Withdrawn',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-600',
    dotColor: 'bg-gray-400',
  },
  expired: {
    label: 'Expired',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-600',
    dotColor: 'bg-gray-400',
  },
};

const sizeStyles: Record<StatusBadgeSize, string> = {
  sm: 'px-2 py-0.5',
  md: 'px-2.5 py-1',
};

const dotSizeStyles: Record<StatusBadgeSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
};

const textSizeStyles: Record<StatusBadgeSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
};

export function StatusBadge({
  status,
  size = 'md',
  className = '',
}: StatusBadgeProps): React.JSX.Element {
  const config = statusMap[status];

  return (
    <View
      className={`self-start flex-row items-center rounded-full ${config.bgColor} ${sizeStyles[size]} ${className}`.trim()}
    >
      <View className={`rounded-full mr-1.5 ${config.dotColor} ${dotSizeStyles[size]}`.trim()} />
      <Text className={`font-medium ${config.textColor} ${textSizeStyles[size]}`.trim()}>
        {config.label}
      </Text>
    </View>
  );
}
