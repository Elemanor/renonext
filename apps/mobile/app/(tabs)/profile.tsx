import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@renonext/shared/api/supabase';
import { getProfile, getProProfile, getClientProfile } from '@renonext/shared/api/profiles';
import { signOut } from '@renonext/shared/api/auth';
import type { Profile, ProProfile, ClientProfile } from '@renonext/shared';
import { Avatar } from '@renonext/ui/Avatar';
import { Badge } from '@renonext/ui/Badge';

interface MenuItemProps {
  icon: string;
  label: string;
  value?: string;
  onPress: () => void;
  iconBg?: string;
  iconColor?: string;
}

function MenuItem({
  icon,
  label,
  value,
  onPress,
  iconBg = '#F3F4F6',
  iconColor = '#6B7280',
}: MenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center py-3 px-4"
      activeOpacity={0.6}
    >
      <View
        className="w-9 h-9 rounded-xl items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        <Ionicons name={icon as any} size={18} color={iconColor} />
      </View>
      <Text className="flex-1 text-base text-gray-900 ml-3 font-medium">{label}</Text>
      {value && (
        <Text className="text-sm text-gray-400 mr-2">{value}</Text>
      )}
      <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
    </TouchableOpacity>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <Text className="text-xs font-bold text-gray-400 px-4 mt-6 mb-2 uppercase tracking-wider">
      {title}
    </Text>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [proProfile, setProProfile] = useState<ProProfile | null>(null);
  const [clientProfile, setClientProfile] = useState<ClientProfile | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const p = await getProfile(user.id);
      setProfile(p);

      if (p.role === 'pro') {
        const pp = await getProProfile(user.id);
        setProProfile(pp);
      } else {
        const cp = await getClientProfile(user.id);
        setClientProfile(cp);
      }
    } catch {
      // Handle error
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProfile();
    setRefreshing(false);
  };

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

  const isPro = profile?.role === 'pro';

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View className="bg-white px-6 pt-4 pb-6">
          {/* Top bar with settings */}
          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-2xl font-bold text-gray-900">Profile</Text>
            <TouchableOpacity
              onPress={() => router.push('/settings')}
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
            >
              <Ionicons name="settings-outline" size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Avatar and Info */}
          <View className="flex-row items-center">
            <View className="relative">
              <View
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                  elevation: 4,
                }}
              >
                <Avatar
                  name={profile?.full_name ?? 'User'}
                  imageUrl={profile?.avatar_url}
                  size="xl"
                />
              </View>
              <TouchableOpacity
                onPress={() => router.push('/settings/edit-profile')}
                className="absolute bottom-0 right-0 bg-primary-600 rounded-full w-8 h-8 items-center justify-center border-2 border-white"
                style={{
                  shadowColor: '#2563EB',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 4,
                }}
              >
                <Ionicons name="camera-outline" size={14} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View className="flex-1 ml-4">
              <Text className="text-xl font-bold text-gray-900">
                {profile?.full_name ?? 'Loading...'}
              </Text>
              <View className="mt-1.5">
                <Badge
                  variant={isPro ? 'info' : 'neutral'}
                  label={isPro ? 'Professional' : 'Client'}
                  size="sm"
                />
              </View>
              {isPro && proProfile?.is_available && (
                <View className="flex-row items-center mt-1.5">
                  <View className="w-2 h-2 bg-secondary-500 rounded-full mr-1.5" />
                  <Text className="text-xs text-secondary-600 font-medium">Available</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Stats Row */}
        {isPro && proProfile && (
          <View
            className="mx-6 -mt-1 bg-white rounded-2xl flex-row py-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View className="flex-1 items-center">
              <View className="w-10 h-10 bg-accent-50 rounded-xl items-center justify-center mb-1.5">
                <Ionicons name="cash-outline" size={18} color="#D97706" />
              </View>
              <Text className="text-lg font-bold text-gray-900">
                ${proProfile.hourly_rate_min ?? 0}
              </Text>
              <Text className="text-xs text-gray-400 font-medium">Min Rate</Text>
            </View>
            <View className="w-px bg-gray-100" />
            <View className="flex-1 items-center">
              <View className="w-10 h-10 bg-accent-50 rounded-xl items-center justify-center mb-1.5">
                <Ionicons name="star" size={18} color="#D97706" />
              </View>
              <Text className="text-lg font-bold text-gray-900">
                {proProfile.avg_rating.toFixed(1)}
              </Text>
              <Text className="text-xs text-gray-400 font-medium">Rating</Text>
            </View>
            <View className="w-px bg-gray-100" />
            <View className="flex-1 items-center">
              <View className="w-10 h-10 bg-secondary-50 rounded-xl items-center justify-center mb-1.5">
                <Ionicons name="checkmark-circle" size={18} color="#059669" />
              </View>
              <Text className="text-lg font-bold text-gray-900">
                {proProfile.total_jobs_completed}
              </Text>
              <Text className="text-xs text-gray-400 font-medium">Jobs Done</Text>
            </View>
          </View>
        )}

        {/* Client Stats */}
        {!isPro && clientProfile && (
          <View
            className="mx-6 -mt-1 bg-white rounded-2xl flex-row py-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View className="flex-1 items-center">
              <View className="w-10 h-10 bg-primary-50 rounded-xl items-center justify-center mb-1.5">
                <Ionicons name="briefcase-outline" size={18} color="#2563EB" />
              </View>
              <Text className="text-lg font-bold text-gray-900">
                {clientProfile.total_jobs_posted ?? 0}
              </Text>
              <Text className="text-xs text-gray-400 font-medium">Jobs Posted</Text>
            </View>
            <View className="w-px bg-gray-100" />
            <View className="flex-1 items-center">
              <View className="w-10 h-10 bg-secondary-50 rounded-xl items-center justify-center mb-1.5">
                <Ionicons name="checkmark-circle" size={18} color="#059669" />
              </View>
              <Text className="text-lg font-bold text-gray-900">
                {clientProfile.total_jobs_completed ?? 0}
              </Text>
              <Text className="text-xs text-gray-400 font-medium">Completed</Text>
            </View>
            <View className="w-px bg-gray-100" />
            <View className="flex-1 items-center">
              <View className="w-10 h-10 bg-accent-50 rounded-xl items-center justify-center mb-1.5">
                <Ionicons name="star" size={18} color="#D97706" />
              </View>
              <Text className="text-lg font-bold text-gray-900">
                {clientProfile.avg_rating?.toFixed(1) ?? '-'}
              </Text>
              <Text className="text-xs text-gray-400 font-medium">Rating</Text>
            </View>
          </View>
        )}

        {/* Menu Items - Pro */}
        {isPro && (
          <View className="mx-6 mt-4 bg-white rounded-2xl overflow-hidden"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <SectionTitle title="Work" />
            <MenuItem
              icon="briefcase-outline"
              label="Active Jobs"
              iconBg="#DBEAFE"
              iconColor="#2563EB"
              onPress={() => router.push('/(tabs)')}
            />
            <View className="h-px bg-gray-50 ml-16" />
            <MenuItem
              icon="document-text-outline"
              label="Job Requests"
              iconBg="#FEF3C7"
              iconColor="#D97706"
              onPress={() => router.push('/(tabs)')}
            />
            <View className="h-px bg-gray-50 ml-16" />
            <MenuItem
              icon="images-outline"
              label="Gallery"
              iconBg="#E0E7FF"
              iconColor="#6366F1"
              onPress={() => router.push('/pro/gallery')}
            />
            <View className="h-px bg-gray-50 ml-16" />
            <MenuItem
              icon="star-outline"
              label="Reviews"
              value={`${proProfile?.total_reviews ?? 0}`}
              iconBg="#FEF3C7"
              iconColor="#D97706"
              onPress={() => router.push('/pro/reviews')}
            />
            <View className="h-px bg-gray-50 ml-16" />
            <MenuItem
              icon="wallet-outline"
              label="Earnings"
              iconBg="#D1FAE5"
              iconColor="#059669"
              onPress={() => router.push('/settings')}
            />
            <View className="h-px bg-gray-50 ml-16" />
            <MenuItem
              icon="time-outline"
              label="Availability"
              value={proProfile?.is_available ? 'Available' : 'Offline'}
              iconBg={proProfile?.is_available ? '#D1FAE5' : '#F3F4F6'}
              iconColor={proProfile?.is_available ? '#059669' : '#9CA3AF'}
              onPress={() => router.push('/settings')}
            />
          </View>
        )}

        {/* Menu Items - Client */}
        {!isPro && (
          <View className="mx-6 mt-4 bg-white rounded-2xl overflow-hidden"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <SectionTitle title="My Activity" />
            <MenuItem
              icon="briefcase-outline"
              label="My Jobs"
              value={`${clientProfile?.total_jobs_posted ?? 0}`}
              iconBg="#DBEAFE"
              iconColor="#2563EB"
              onPress={() => router.push('/(tabs)')}
            />
            <View className="h-px bg-gray-50 ml-16" />
            <MenuItem
              icon="star-outline"
              label="Reviews"
              iconBg="#FEF3C7"
              iconColor="#D97706"
              onPress={() => router.push('/pro/reviews')}
            />
            <View className="h-px bg-gray-50 ml-16" />
            <MenuItem
              icon="card-outline"
              label="Payment Methods"
              iconBg="#D1FAE5"
              iconColor="#059669"
              onPress={() => router.push('/settings/payment-methods')}
            />
            <View className="h-px bg-gray-50 ml-16" />
            <MenuItem
              icon="heart-outline"
              label="Saved Pros"
              iconBg="#FCE7F3"
              iconColor="#EC4899"
              onPress={() => router.push('/(tabs)/search')}
            />
          </View>
        )}

        {/* Settings */}
        <View className="mx-6 mt-4 bg-white rounded-2xl overflow-hidden"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <SectionTitle title="Settings" />
          <MenuItem
            icon="settings-outline"
            label="Account Settings"
            iconBg="#F3F4F6"
            iconColor="#6B7280"
            onPress={() => router.push('/settings')}
          />
          <View className="h-px bg-gray-50 ml-16" />
          <MenuItem
            icon="notifications-outline"
            label="Notifications"
            iconBg="#DBEAFE"
            iconColor="#2563EB"
            onPress={() => router.push('/settings/notifications')}
          />
          <View className="h-px bg-gray-50 ml-16" />
          <MenuItem
            icon="help-circle-outline"
            label="Help & Support"
            iconBg="#E0E7FF"
            iconColor="#6366F1"
            onPress={() => router.push('/settings')}
          />
        </View>

        {/* Sign Out */}
        <View className="mx-6 mt-4 mb-8">
          <TouchableOpacity
            onPress={handleSignOut}
            className="flex-row items-center justify-center py-4 bg-white rounded-2xl border border-red-100"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.03,
              shadowRadius: 4,
              elevation: 1,
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text className="text-red-500 font-bold ml-2 text-base">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
