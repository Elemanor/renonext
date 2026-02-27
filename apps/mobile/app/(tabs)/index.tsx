import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@renonext/shared/api/supabase';
import type { Category, Job } from '@renonext/shared';
import type { ProWithProfile } from '@renonext/shared';
import { Card, CardContent } from '@renonext/ui/Card';
import { Avatar } from '@renonext/ui/Avatar';
import { Badge } from '@renonext/ui/Badge';
import { Rating } from '@renonext/ui/Rating';
import ProCard from '../../components/ProCard';
import JobCard from '../../components/JobCard';
import CategoryCard from '../../components/CategoryCard';

const CATEGORY_ICONS: Record<string, string> = {
  plumbing: 'water-outline',
  electrical: 'flash-outline',
  carpentry: 'hammer-outline',
  painting: 'color-palette-outline',
  hvac: 'thermometer-outline',
  landscaping: 'leaf-outline',
  cleaning: 'sparkles-outline',
  roofing: 'home-outline',
  flooring: 'grid-outline',
  general: 'construct-outline',
};

const CATEGORY_GRADIENTS: Record<string, string[]> = {
  plumbing: ['#DBEAFE', '#2563EB'],
  electrical: ['#FEF3C7', '#F59E0B'],
  carpentry: ['#FEE2E2', '#EF4444'],
  painting: ['#E0E7FF', '#6366F1'],
  hvac: ['#D1FAE5', '#10B981'],
  landscaping: ['#D1FAE5', '#059669'],
  cleaning: ['#FCE7F3', '#EC4899'],
  roofing: ['#FED7AA', '#EA580C'],
  flooring: ['#E5E7EB', '#6B7280'],
  general: ['#DBEAFE', '#3B82F6'],
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredPros, setFeaturedPros] = useState<ProWithProfile[]>([]);
  const [activeJobs, setActiveJobs] = useState<Job[]>([]);
  const [userName, setUserName] = useState<string>('');

  const fetchData = async () => {
    try {
      // Get user name for greeting
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        if (profile?.full_name) {
          setUserName(profile.full_name.split(' ')[0]);
        }
      }

      const { data: cats } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      setCategories((cats ?? []) as Category[]);

      const { data: pros } = await supabase
        .from('pro_profiles')
        .select('*, profile:profiles(*)')
        .eq('is_available', true)
        .order('avg_rating', { ascending: false })
        .limit(10);
      setFeaturedPros((pros ?? []) as ProWithProfile[]);

      const { data: jobs } = await supabase
        .from('jobs')
        .select('*, category:categories(*)')
        .in('status', ['posted', 'bidding', 'in_progress'])
        .order('created_at', { ascending: false })
        .limit(10);
      setActiveJobs((jobs ?? []) as Job[]);
    } catch {
      // Silently handle fetch errors on home screen
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-gray-500 font-medium">
              {getGreeting()}{userName ? ',' : ''}
            </Text>
            <Text className="text-2xl font-bold text-gray-900">
              {userName || 'Welcome'} <Text className="text-2xl">&#128075;</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/settings/notifications')}
            className="w-11 h-11 bg-white rounded-full items-center justify-center"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.06,
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            <Ionicons name="notifications-outline" size={22} color="#374151" />
            {/* Unread dot */}
            <View className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/search')}
          className="mx-6 mt-3 mb-5"
        >
          <View
            className="flex-row items-center bg-white rounded-2xl px-4 py-3.5 border border-gray-100"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <View className="w-8 h-8 bg-primary-50 rounded-lg items-center justify-center">
              <Ionicons name="search" size={18} color="#2563EB" />
            </View>
            <Text className="text-gray-400 ml-3 text-base flex-1">
              Search for a pro or service...
            </Text>
            <View className="w-8 h-8 bg-gray-100 rounded-lg items-center justify-center">
              <Ionicons name="options-outline" size={16} color="#6B7280" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View className="flex-row px-6 gap-3 mb-6">
          <TouchableOpacity
            onPress={() => router.push('/job/post/category')}
            className="flex-1 bg-primary-600 rounded-2xl px-4 py-3.5 flex-row items-center"
            style={{
              shadowColor: '#2563EB',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <View className="w-9 h-9 bg-white/20 rounded-xl items-center justify-center">
              <Ionicons name="add" size={22} color="#ffffff" />
            </View>
            <View className="ml-2.5">
              <Text className="text-white font-bold text-sm">Post Job</Text>
              <Text className="text-primary-200 text-xs">Hire a pro</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/messages')}
            className="flex-1 bg-white rounded-2xl px-4 py-3.5 flex-row items-center border border-gray-100"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <View className="w-9 h-9 bg-secondary-50 rounded-xl items-center justify-center">
              <Ionicons name="chatbubble" size={18} color="#059669" />
            </View>
            <View className="ml-2.5">
              <Text className="text-gray-900 font-bold text-sm">Messages</Text>
              <Text className="text-gray-400 text-xs">Chat now</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Featured Pros */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center px-6 mb-3">
            <Text className="text-lg font-bold text-gray-900">Featured Pros</Text>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/search')}
              className="flex-row items-center"
            >
              <Text className="text-primary-600 text-sm font-semibold">See All</Text>
              <Ionicons name="chevron-forward" size={16} color="#2563EB" />
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={featuredPros}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            ItemSeparatorComponent={() => <View className="w-3" />}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/pro/${item.user_id}`)}
                className="w-52"
              >
                <View
                  className="bg-white rounded-2xl overflow-hidden"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 8,
                    elevation: 3,
                  }}
                >
                  {/* Gradient top */}
                  <View className="bg-primary-600 h-16 items-center justify-end pb-0">
                    <View className="absolute bottom-0 translate-y-1/2" />
                  </View>
                  <View className="items-center -mt-8 px-4 pb-4">
                    <View
                      className="rounded-full border-[3px] border-white"
                      style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 4,
                      }}
                    >
                      <Avatar
                        name={item.profile?.full_name ?? 'Pro'}
                        imageUrl={item.profile?.avatar_url}
                        size="lg"
                      />
                    </View>
                    {/* Verified badge */}
                    <View className="flex-row items-center mt-2">
                      <Text
                        className="font-bold text-gray-900 text-center text-sm"
                        numberOfLines={1}
                      >
                        {item.profile?.full_name ?? 'Pro'}
                      </Text>
                      <View className="ml-1">
                        <Ionicons name="checkmark-circle" size={14} color="#2563EB" />
                      </View>
                    </View>
                    <Text
                      className="text-xs text-gray-500 mt-0.5 text-center"
                      numberOfLines={1}
                    >
                      {item.headline ?? 'Professional'}
                    </Text>
                    <Rating
                      rating={item.avg_rating}
                      size="sm"
                      showValue
                      reviewCount={item.total_reviews}
                      className="mt-1.5"
                    />
                    {item.hourly_rate_min != null && (
                      <View className="bg-primary-50 rounded-lg px-2.5 py-1 mt-2">
                        <Text className="text-xs text-primary-700 font-bold">
                          ${item.hourly_rate_min}-${item.hourly_rate_max}/hr
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View className="items-center py-8 w-full">
                <Text className="text-gray-400">No featured pros yet</Text>
              </View>
            }
          />
        </View>

        {/* Active Near You */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center px-6 mb-3">
            <Text className="text-lg font-bold text-gray-900">Active Near You</Text>
            <TouchableOpacity
              onPress={() => router.push('/map')}
              className="flex-row items-center"
            >
              <Ionicons name="map-outline" size={14} color="#2563EB" />
              <Text className="text-primary-600 text-sm font-semibold ml-1">Map</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={activeJobs}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            ItemSeparatorComponent={() => <View className="w-3" />}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/job/${item.id}`)}
                className="w-72"
              >
                <JobCard job={item} />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View className="items-center py-8 w-full">
                <Text className="text-gray-400">No active jobs nearby</Text>
              </View>
            }
          />
        </View>

        {/* Categories Grid */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">Browse Categories</Text>
          <View className="flex-row flex-wrap gap-3">
            {categories.map((cat) => {
              const colors = CATEGORY_GRADIENTS[cat.slug] ?? ['#DBEAFE', '#2563EB'];
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() =>
                    router.push({
                      pathname: '/(tabs)/search',
                      params: { category: cat.id },
                    })
                  }
                  className="w-[48%]"
                >
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
                        className="w-12 h-12 rounded-xl items-center justify-center mb-2"
                        style={{ backgroundColor: colors[0] }}
                      >
                        <Ionicons
                          name={(CATEGORY_ICONS[cat.slug] ?? 'construct-outline') as any}
                          size={24}
                          color={colors[1]}
                        />
                      </View>
                      <Text
                        className="text-sm font-semibold text-gray-900 text-center"
                        numberOfLines={1}
                      >
                        {cat.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Spacer for bottom of scroll */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
