import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@renonext/shared/api/supabase';
import type { ProWithProfile } from '@renonext/shared';
import ProCard from '../../components/ProCard';
import EmptyState from '../../components/EmptyState';

type ViewMode = 'list' | 'map';

const FILTER_CHIPS = [
  { key: 'all', label: 'All', icon: 'grid-outline' },
  { key: 'top-rated', label: 'Top Rated', icon: 'star-outline' },
  { key: 'available', label: 'Available Now', icon: 'checkmark-circle-outline' },
  { key: 'nearby', label: 'Nearby', icon: 'location-outline' },
];

const PRICE_RANGES = [
  { label: 'Any Price', icon: 'cash-outline' },
  { label: 'Under $40', icon: 'trending-down-outline' },
  { label: '$40-$60', icon: 'remove-outline' },
  { label: '$60-$80', icon: 'trending-up-outline' },
  { label: '$80+', icon: 'diamond-outline' },
];

export default function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeFilter, setActiveFilter] = useState('all');
  const [pros, setPros] = useState<ProWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);

  const fetchPros = useCallback(async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('pro_profiles')
        .select('*, profile:profiles(*)')
        .order('avg_rating', { ascending: false });

      if (activeFilter === 'available') {
        query = query.eq('is_available', true);
      }
      if (activeFilter === 'top-rated') {
        query = query.gte('avg_rating', 4);
      }

      if (selectedPriceRange === 1) {
        query = query.lt('hourly_rate_min', 40);
      } else if (selectedPriceRange === 2) {
        query = query.gte('hourly_rate_min', 40).lte('hourly_rate_min', 60);
      } else if (selectedPriceRange === 3) {
        query = query.gte('hourly_rate_min', 60).lte('hourly_rate_min', 80);
      } else if (selectedPriceRange === 4) {
        query = query.gte('hourly_rate_min', 80);
      }

      const { data } = await query.limit(50);
      let results = (data ?? []) as ProWithProfile[];

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        results = results.filter(
          (p) =>
            p.profile?.full_name?.toLowerCase().includes(q) ||
            p.headline?.toLowerCase().includes(q) ||
            p.bio?.toLowerCase().includes(q)
        );
      }

      setPros(results);
    } catch {
      setPros([]);
    } finally {
      setIsLoading(false);
    }
  }, [activeFilter, selectedPriceRange, searchQuery]);

  useEffect(() => {
    fetchPros();
  }, [fetchPros]);

  const renderProItem = useCallback(
    ({ item }: { item: ProWithProfile }) => (
      <TouchableOpacity
        onPress={() => router.push(`/pro/${item.user_id}`)}
        className="px-6 mb-3"
      >
        <ProCard pro={item} />
      </TouchableOpacity>
    ),
    [router]
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Search Header */}
      <View className="bg-white px-6 pt-4 pb-3">
        {/* Search Input */}
        <View className="flex-row items-center gap-3">
          <View
            className="flex-1 flex-row items-center bg-gray-100 rounded-2xl px-4 py-3"
          >
            <Ionicons name="search" size={18} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-2.5 text-base text-gray-900"
              placeholder="Search pros, skills..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <View className="w-5 h-5 bg-gray-300 rounded-full items-center justify-center">
                  <Ionicons name="close" size={12} color="#ffffff" />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            className={`w-12 h-12 items-center justify-center rounded-2xl ${
              showFilters ? 'bg-primary-600' : 'bg-gray-100'
            }`}
          >
            <Ionicons
              name="options-outline"
              size={22}
              color={showFilters ? '#ffffff' : '#374151'}
            />
          </TouchableOpacity>
        </View>

        {/* View Mode Toggle - Segmented Control */}
        <View className="flex-row items-center mt-3 bg-gray-100 rounded-xl p-1">
          <TouchableOpacity
            onPress={() => setViewMode('list')}
            className={`flex-1 flex-row items-center justify-center py-2 rounded-lg ${
              viewMode === 'list' ? 'bg-white' : ''
            }`}
            style={
              viewMode === 'list'
                ? {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.06,
                    shadowRadius: 4,
                    elevation: 2,
                  }
                : undefined
            }
          >
            <Ionicons
              name="list"
              size={16}
              color={viewMode === 'list' ? '#2563EB' : '#6B7280'}
            />
            <Text
              className={`text-sm ml-1.5 font-semibold ${
                viewMode === 'list' ? 'text-primary-600' : 'text-gray-500'
              }`}
            >
              List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setViewMode('map')}
            className={`flex-1 flex-row items-center justify-center py-2 rounded-lg ${
              viewMode === 'map' ? 'bg-white' : ''
            }`}
            style={
              viewMode === 'map'
                ? {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.06,
                    shadowRadius: 4,
                    elevation: 2,
                  }
                : undefined
            }
          >
            <Ionicons
              name="map"
              size={16}
              color={viewMode === 'map' ? '#2563EB' : '#6B7280'}
            />
            <Text
              className={`text-sm ml-1.5 font-semibold ${
                viewMode === 'map' ? 'text-primary-600' : 'text-gray-500'
              }`}
            >
              Map
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={FILTER_CHIPS}
          keyExtractor={(item) => item.key}
          className="mt-3"
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setActiveFilter(item.key)}
              className={`flex-row items-center px-4 py-2 rounded-xl mr-2 border ${
                activeFilter === item.key
                  ? 'bg-primary-600 border-primary-600'
                  : 'bg-white border-gray-200'
              }`}
            >
              <Ionicons
                name={item.icon as any}
                size={14}
                color={activeFilter === item.key ? '#ffffff' : '#6B7280'}
              />
              <Text
                className={`text-sm font-medium ml-1.5 ${
                  activeFilter === item.key ? 'text-white' : 'text-gray-700'
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Expanded Filters */}
      {showFilters && (
        <View
          className="bg-white px-6 py-4 border-t border-gray-100"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text className="text-sm font-bold text-gray-900 mb-3">Price Range</Text>
          <View className="flex-row flex-wrap gap-2">
            {PRICE_RANGES.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => setSelectedPriceRange(index)}
                className={`flex-row items-center px-3.5 py-2 rounded-xl border ${
                  selectedPriceRange === index
                    ? 'bg-primary-50 border-primary-300'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Ionicons
                  name={item.icon as any}
                  size={14}
                  color={selectedPriceRange === index ? '#2563EB' : '#9CA3AF'}
                />
                <Text
                  className={`text-xs font-medium ml-1.5 ${
                    selectedPriceRange === index ? 'text-primary-700' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Results */}
      {viewMode === 'list' ? (
        <FlatList
          data={pros}
          keyExtractor={(item) => item.id}
          renderItem={renderProItem}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
          ListHeaderComponent={
            <View className="px-6 flex-row items-center justify-between mb-3">
              <Text className="text-sm text-gray-500 font-medium">
                {isLoading ? 'Searching...' : `${pros.length} professionals found`}
              </Text>
              {!isLoading && pros.length > 0 && (
                <View className="flex-row items-center">
                  <Ionicons name="swap-vertical" size={14} color="#9CA3AF" />
                  <Text className="text-xs text-gray-400 ml-1">By rating</Text>
                </View>
              )}
            </View>
          }
          ListEmptyComponent={
            isLoading ? (
              <View className="items-center py-16">
                <ActivityIndicator size="large" color="#2563EB" />
                <Text className="text-sm text-gray-400 mt-3">Finding pros near you...</Text>
              </View>
            ) : (
              <EmptyState
                icon="search-outline"
                title="No pros found"
                description="Try adjusting your search or filters to find more professionals."
              />
            )
          }
        />
      ) : (
        <View className="flex-1 items-center justify-center bg-gray-100">
          <View className="items-center px-8">
            <View
              className="w-20 h-20 bg-white rounded-full items-center justify-center mb-4"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <Ionicons name="map" size={36} color="#2563EB" />
            </View>
            <Text className="text-lg font-bold text-gray-900 text-center mb-2">
              Explore on Map
            </Text>
            <Text className="text-sm text-gray-500 text-center mb-6 leading-5">
              See pro locations near you. Enable location services for the best experience.
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/map')}
              className="bg-primary-600 px-8 py-3.5 rounded-xl"
              style={{
                shadowColor: '#2563EB',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <Text className="text-white font-bold">Open Full Map</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
