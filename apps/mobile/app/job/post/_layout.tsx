import React from 'react';
import { View, Text } from 'react-native';
import { Stack, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const STEPS = [
  { path: '/job/post/category', title: 'Category', step: 1, icon: 'grid-outline' },
  { path: '/job/post/details', title: 'Details', step: 2, icon: 'document-text-outline' },
  { path: '/job/post/materials', title: 'Materials', step: 3, icon: 'construct-outline' },
  { path: '/job/post/review', title: 'Review', step: 4, icon: 'checkmark-circle-outline' },
];

function StepIndicator() {
  const pathname = usePathname();
  const currentStep = STEPS.find((s) => pathname.includes(s.path.split('/').pop()!))?.step ?? 1;
  const progress = (currentStep / STEPS.length) * 100;

  return (
    <View className="bg-white border-b border-gray-100 pb-3">
      {/* Progress bar */}
      <View className="h-1 bg-gray-100">
        <View
          className="h-1 bg-primary-600 rounded-r-full"
          style={{ width: `${progress}%` }}
        />
      </View>

      {/* Step indicators */}
      <View className="flex-row items-center justify-between px-6 pt-4">
        {STEPS.map((step) => {
          const isCompleted = step.step < currentStep;
          const isCurrent = step.step === currentStep;
          const isUpcoming = step.step > currentStep;

          return (
            <View key={step.step} className="items-center flex-1">
              <View
                className={`w-10 h-10 rounded-full items-center justify-center mb-1.5 ${
                  isCompleted
                    ? 'bg-secondary-500'
                    : isCurrent
                    ? 'bg-primary-600'
                    : 'bg-gray-100'
                }`}
              >
                {isCompleted ? (
                  <Ionicons name="checkmark" size={20} color="#ffffff" />
                ) : (
                  <Ionicons
                    name={step.icon as any}
                    size={18}
                    color={isCurrent ? '#ffffff' : '#9CA3AF'}
                  />
                )}
              </View>
              <Text
                className={`text-xs font-medium ${
                  isCurrent
                    ? 'text-primary-600'
                    : isCompleted
                    ? 'text-secondary-600'
                    : 'text-gray-400'
                }`}
              >
                {step.title}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default function PostJobLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <StepIndicator />,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="category" options={{ title: 'Select Category' }} />
      <Stack.Screen name="details" options={{ title: 'Job Details' }} />
      <Stack.Screen name="materials" options={{ title: 'Materials' }} />
      <Stack.Screen name="review" options={{ title: 'Review' }} />
    </Stack>
  );
}
