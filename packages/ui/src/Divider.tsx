import React from 'react';
import { View, Text } from 'react-native';

export interface DividerProps {
  label?: string;
  className?: string;
}

export function Divider({ label, className = '' }: DividerProps): React.JSX.Element {
  if (label) {
    return (
      <View className={`flex-row items-center my-4 ${className}`.trim()}>
        <View className="flex-1 h-px bg-gray-200" />
        <Text className="mx-3 text-sm text-gray-400 font-medium">{label}</Text>
        <View className="flex-1 h-px bg-gray-200" />
      </View>
    );
  }

  return (
    <View className={`my-4 ${className}`.trim()}>
      <View className="h-px bg-gray-200" />
    </View>
  );
}
