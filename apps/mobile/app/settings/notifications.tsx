import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface NotificationToggleProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function NotificationToggle({
  icon,
  iconBg,
  iconColor,
  label,
  description,
  value,
  onValueChange,
}: NotificationToggleProps) {
  return (
    <View className="flex-row items-center py-3.5 px-4">
      <View className={`w-10 h-10 ${iconBg} rounded-xl items-center justify-center mr-3`}>
        <Ionicons name={icon as any} size={18} color={iconColor} />
      </View>
      <View className="flex-1 mr-3">
        <Text className="text-base font-medium text-gray-900">{label}</Text>
        <Text className="text-xs text-gray-400 mt-0.5">{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
        thumbColor={value ? '#2563EB' : '#ffffff'}
        ios_backgroundColor="#E5E7EB"
      />
    </View>
  );
}

function SectionSpacer() {
  return <View className="h-px bg-gray-50 mx-4" />;
}

export default function NotificationsSettingsScreen() {
  const [settings, setSettings] = useState({
    newBids: true,
    bidAccepted: true,
    bidRejected: true,
    jobStarted: true,
    jobCompleted: true,
    newMessages: true,
    newReviews: true,
    paymentReceived: true,
    progressUpdates: true,
    promotions: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Notifications' }} />
      <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
        <View className="mt-5">
          <Text className="text-xs font-bold text-gray-400 px-4 mb-2 uppercase tracking-wider">
            Job Notifications
          </Text>
          <View className="bg-white rounded-2xl mx-4 overflow-hidden">
            <NotificationToggle
              icon="megaphone-outline"
              iconBg="bg-blue-50"
              iconColor="#2563EB"
              label="New Bids"
              description="When a pro bids on your job"
              value={settings.newBids}
              onValueChange={() => toggle('newBids')}
            />
            <SectionSpacer />
            <NotificationToggle
              icon="checkmark-circle-outline"
              iconBg="bg-green-50"
              iconColor="#059669"
              label="Bid Accepted"
              description="When your bid is accepted"
              value={settings.bidAccepted}
              onValueChange={() => toggle('bidAccepted')}
            />
            <SectionSpacer />
            <NotificationToggle
              icon="close-circle-outline"
              iconBg="bg-red-50"
              iconColor="#EF4444"
              label="Bid Declined"
              description="When your bid is declined"
              value={settings.bidRejected}
              onValueChange={() => toggle('bidRejected')}
            />
            <SectionSpacer />
            <NotificationToggle
              icon="play-circle-outline"
              iconBg="bg-amber-50"
              iconColor="#D97706"
              label="Job Started"
              description="When a pro starts working"
              value={settings.jobStarted}
              onValueChange={() => toggle('jobStarted')}
            />
            <SectionSpacer />
            <NotificationToggle
              icon="flag-outline"
              iconBg="bg-green-50"
              iconColor="#059669"
              label="Job Completed"
              description="When a job is marked complete"
              value={settings.jobCompleted}
              onValueChange={() => toggle('jobCompleted')}
            />
            <SectionSpacer />
            <NotificationToggle
              icon="pulse-outline"
              iconBg="bg-purple-50"
              iconColor="#8B5CF6"
              label="Progress Updates"
              description="Real-time job progress notifications"
              value={settings.progressUpdates}
              onValueChange={() => toggle('progressUpdates')}
            />
          </View>
        </View>

        <View className="mt-5">
          <Text className="text-xs font-bold text-gray-400 px-4 mb-2 uppercase tracking-wider">
            Other
          </Text>
          <View className="bg-white rounded-2xl mx-4 overflow-hidden">
            <NotificationToggle
              icon="chatbubble-outline"
              iconBg="bg-blue-50"
              iconColor="#2563EB"
              label="New Messages"
              description="When you receive a new chat message"
              value={settings.newMessages}
              onValueChange={() => toggle('newMessages')}
            />
            <SectionSpacer />
            <NotificationToggle
              icon="star-outline"
              iconBg="bg-amber-50"
              iconColor="#D97706"
              label="New Reviews"
              description="When someone leaves you a review"
              value={settings.newReviews}
              onValueChange={() => toggle('newReviews')}
            />
            <SectionSpacer />
            <NotificationToggle
              icon="cash-outline"
              iconBg="bg-green-50"
              iconColor="#059669"
              label="Payment Received"
              description="When a payment is processed"
              value={settings.paymentReceived}
              onValueChange={() => toggle('paymentReceived')}
            />
            <SectionSpacer />
            <NotificationToggle
              icon="gift-outline"
              iconBg="bg-pink-50"
              iconColor="#EC4899"
              label="Promotions"
              description="Special offers and tips"
              value={settings.promotions}
              onValueChange={() => toggle('promotions')}
            />
          </View>
        </View>

        <View className="h-6" />
      </SafeAreaView>
    </>
  );
}
