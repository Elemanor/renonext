import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Category } from '@renonext/shared';

interface CategoryCardProps {
  category: Category;
  icon: string;
  jobCount?: number;
  bgColor?: string;
  iconColor?: string;
}

export default function CategoryCard({
  category,
  icon,
  jobCount,
  bgColor = '#EFF6FF',
  iconColor = '#2563EB',
}: CategoryCardProps) {
  return (
    <View
      className="bg-white rounded-2xl overflow-hidden"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <View className="items-center py-4 px-3">
        <View
          className="w-12 h-12 rounded-xl items-center justify-center mb-2.5"
          style={{ backgroundColor: bgColor }}
        >
          <Ionicons name={icon as any} size={24} color={iconColor} />
        </View>
        <Text
          className="text-sm font-semibold text-gray-900 text-center"
          numberOfLines={1}
        >
          {category.name}
        </Text>
        {jobCount !== undefined && (
          <Text className="text-xs text-gray-400 mt-0.5 font-medium">
            {jobCount} job{jobCount !== 1 ? 's' : ''}
          </Text>
        )}
      </View>
    </View>
  );
}
