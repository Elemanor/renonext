import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from '@renonext/shared/api/auth';

interface MenuItemProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  description?: string;
  onPress: () => void;
  destructive?: boolean;
  showBadge?: boolean;
}

function MenuItem({
  icon,
  iconBg,
  iconColor,
  label,
  description,
  onPress,
  destructive = false,
  showBadge = false,
}: MenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center py-3.5 px-4 bg-white"
      activeOpacity={0.6}
    >
      <View className={`w-10 h-10 ${iconBg} rounded-xl items-center justify-center mr-3`}>
        <Ionicons
          name={icon as any}
          size={20}
          color={destructive ? '#EF4444' : iconColor}
        />
      </View>
      <View className="flex-1">
        <Text
          className={`text-base font-medium ${
            destructive ? 'text-red-500' : 'text-gray-900'
          }`}
        >
          {label}
        </Text>
        {description && (
          <Text className="text-xs text-gray-400 mt-0.5">{description}</Text>
        )}
      </View>
      <View className="flex-row items-center">
        {showBadge && (
          <View className="w-2 h-2 bg-red-500 rounded-full mr-2" />
        )}
        <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
      </View>
    </TouchableOpacity>
  );
}

function SectionSpacer() {
  return <View className="h-px bg-gray-50 mx-4" />;
}

export default function SettingsScreen() {
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Settings' }} />
      <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
        <View className="mt-5">
          <Text className="text-xs font-bold text-gray-400 px-4 mb-2 uppercase tracking-wider">
            Account
          </Text>
          <View className="bg-white rounded-2xl mx-4 overflow-hidden">
            <MenuItem
              icon="person-outline"
              iconBg="bg-blue-50"
              iconColor="#2563EB"
              label="Edit Profile"
              description="Name, photo, and personal details"
              onPress={() => router.push('/settings/edit-profile')}
            />
            <SectionSpacer />
            <MenuItem
              icon="notifications-outline"
              iconBg="bg-amber-50"
              iconColor="#D97706"
              label="Notifications"
              description="Push notifications and alerts"
              onPress={() => router.push('/settings/notifications')}
            />
            <SectionSpacer />
            <MenuItem
              icon="card-outline"
              iconBg="bg-green-50"
              iconColor="#059669"
              label="Payment Methods"
              description="Manage cards and billing"
              onPress={() => router.push('/settings/payment-methods')}
            />
          </View>
        </View>

        <View className="mt-5">
          <Text className="text-xs font-bold text-gray-400 px-4 mb-2 uppercase tracking-wider">
            Support
          </Text>
          <View className="bg-white rounded-2xl mx-4 overflow-hidden">
            <MenuItem
              icon="shield-checkmark-outline"
              iconBg="bg-purple-50"
              iconColor="#8B5CF6"
              label="Privacy Policy"
              onPress={() => {}}
            />
            <SectionSpacer />
            <MenuItem
              icon="document-text-outline"
              iconBg="bg-indigo-50"
              iconColor="#6366F1"
              label="Terms of Service"
              onPress={() => {}}
            />
            <SectionSpacer />
            <MenuItem
              icon="help-circle-outline"
              iconBg="bg-cyan-50"
              iconColor="#06B6D4"
              label="Help Center"
              description="FAQ and support"
              onPress={() => {}}
            />
          </View>
        </View>

        <View className="mt-5">
          <View className="bg-white rounded-2xl mx-4 overflow-hidden">
            <MenuItem
              icon="log-out-outline"
              iconBg="bg-red-50"
              iconColor="#EF4444"
              label="Sign Out"
              onPress={handleSignOut}
              destructive
            />
          </View>
        </View>

        <View className="items-center mt-8 gap-1">
          <Text className="text-xs text-gray-400 font-medium">RenoNext v1.0.0</Text>
          <Text className="text-xs text-gray-300">Made with care in Toronto</Text>
        </View>
      </SafeAreaView>
    </>
  );
}
