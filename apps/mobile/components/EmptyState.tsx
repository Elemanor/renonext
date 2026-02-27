import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center py-16 px-8">
      <View
        className="w-24 h-24 bg-gray-50 rounded-full items-center justify-center mb-5"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center">
          <Ionicons name={icon as any} size={32} color="#D1D5DB" />
        </View>
      </View>
      <Text className="text-lg font-bold text-gray-900 text-center">{title}</Text>
      <Text className="text-sm text-gray-500 text-center mt-2 leading-5 max-w-[280px]">
        {description}
      </Text>
      {actionLabel && onAction && (
        <TouchableOpacity
          onPress={onAction}
          className="mt-5 bg-primary-600 rounded-xl px-7 py-3.5"
          activeOpacity={0.7}
          style={{
            shadowColor: '#2563EB',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <Text className="text-white font-bold text-sm">{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
