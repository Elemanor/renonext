import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorScreenProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorScreen({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
}: ErrorScreenProps) {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 px-8">
      <View className="w-20 h-20 bg-red-50 rounded-full items-center justify-center mb-5">
        <Ionicons name="alert-circle-outline" size={44} color="#EF4444" />
      </View>
      <Text className="text-xl font-bold text-gray-900 text-center mb-2">
        {title}
      </Text>
      <Text className="text-base text-gray-500 text-center leading-6 mb-8">
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="bg-primary-600 px-8 py-3.5 rounded-xl flex-row items-center"
          activeOpacity={0.7}
        >
          <Ionicons name="refresh-outline" size={20} color="#ffffff" />
          <Text className="text-white font-semibold text-base ml-2">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
