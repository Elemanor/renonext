import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@renonext/shared/api/supabase';
import type { Tool } from '@renonext/shared';
import { Badge } from '@renonext/ui/Badge';
import EmptyState from '../../components/EmptyState';

const CATEGORY_FILTERS = [
  { key: 'all', label: 'All Tools', icon: 'grid-outline' },
  { key: 'power', label: 'Power Tools', icon: 'flash-outline' },
  { key: 'hand', label: 'Hand Tools', icon: 'hammer-outline' },
  { key: 'measuring', label: 'Measuring', icon: 'resize-outline' },
  { key: 'safety', label: 'Safety', icon: 'shield-outline' },
];

export default function BrowseToolsScreen() {
  const router = useRouter();
  const [tools, setTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase
          .from('tools')
          .select('*')
          .order('name', { ascending: true });
        setTools((data ?? []) as Tool[]);
      } catch {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredTools = searchQuery
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tools;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      {/* Search Bar */}
      <View className="bg-white px-4 pt-3 pb-2 border-b border-gray-100">
        <View
          className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.03,
            shadowRadius: 2,
            elevation: 1,
          }}
        >
          <Ionicons name="search-outline" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2.5 text-base text-gray-900"
            placeholder="Search tools and equipment..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filters */}
        <FlatList
          data={CATEGORY_FILTERS}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10, gap: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setActiveFilter(item.key)}
              className={`flex-row items-center px-4 py-2 rounded-xl ${
                activeFilter === item.key ? 'bg-primary-600' : 'bg-gray-100'
              }`}
              activeOpacity={0.7}
            >
              <Ionicons
                name={item.icon as any}
                size={16}
                color={activeFilter === item.key ? '#ffffff' : '#6B7280'}
              />
              <Text
                className={`text-sm font-medium ml-1.5 ${
                  activeFilter === item.key ? 'text-white' : 'text-gray-600'
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Results Count */}
      {!isLoading && (
        <View className="px-4 pt-4 pb-2">
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} available
          </Text>
        </View>
      )}

      <FlatList
        data={filteredTools}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/tools/${item.id}`)}
            activeOpacity={0.8}
          >
            <View
              className="bg-white rounded-2xl mb-3 overflow-hidden"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.04,
                shadowRadius: 3,
                elevation: 1,
              }}
            >
              <View className="flex-row items-center p-4">
                {/* Tool Icon */}
                <View className="w-16 h-16 bg-amber-50 rounded-2xl items-center justify-center mr-3">
                  <Ionicons
                    name={item.image_url ? 'construct' : 'hammer-outline'}
                    size={28}
                    color="#D97706"
                  />
                </View>

                {/* Tool Info */}
                <View className="flex-1 mr-3">
                  <Text className="text-base font-bold text-gray-900">{item.name}</Text>
                  {item.description && (
                    <Text className="text-sm text-gray-500 mt-0.5" numberOfLines={2}>
                      {item.description}
                    </Text>
                  )}
                  <View className="flex-row items-center mt-2 gap-2">
                    {item.daily_rental_price != null && (
                      <View className="bg-green-50 rounded-lg px-2.5 py-1">
                        <Text className="text-xs font-bold text-green-700">
                          ${item.daily_rental_price}/day
                        </Text>
                      </View>
                    )}
                    <Badge variant="success" label="Available" size="sm" />
                  </View>
                </View>

                {/* Chevron */}
                <View className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center">
                  <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          isLoading ? (
            <View className="items-center py-16">
              <Text className="text-gray-400">Loading tools...</Text>
            </View>
          ) : (
            <EmptyState
              icon="hammer-outline"
              title={searchQuery ? 'No Results' : 'No Tools Found'}
              description={
                searchQuery
                  ? `No tools match "${searchQuery}". Try a different search.`
                  : 'No tools available for rent at this time.'
              }
            />
          )
        }
      />
    </SafeAreaView>
  );
}
