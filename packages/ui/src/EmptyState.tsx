import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}: EmptyStateProps): React.JSX.Element {
  return (
    <View className={`items-center justify-center py-12 px-6 ${className}`.trim()}>
      {/* Icon circle */}
      <View className="w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-4">
        <Text className="text-3xl">{icon}</Text>
      </View>

      {/* Title */}
      <Text className="text-lg font-semibold text-gray-900 text-center mb-2">
        {title}
      </Text>

      {/* Description */}
      <Text className="text-sm text-gray-500 text-center leading-5 max-w-xs">
        {description}
      </Text>

      {/* Action button */}
      {actionLabel && onAction ? (
        <TouchableOpacity
          onPress={onAction}
          className="mt-5 bg-blue-600 rounded-lg px-5 py-2.5"
          activeOpacity={0.7}
        >
          <Text className="text-white font-semibold text-sm">{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
