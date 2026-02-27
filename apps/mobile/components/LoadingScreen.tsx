import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <View className="w-20 h-20 bg-white rounded-2xl items-center justify-center shadow-sm mb-4">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
      <Text className="text-base font-medium text-gray-700">{message}</Text>
      <Text className="text-sm text-gray-400 mt-1">Please wait a moment</Text>
    </View>
  );
}
