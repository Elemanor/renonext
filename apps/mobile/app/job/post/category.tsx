import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@renonext/shared/api/supabase';
import type { Category } from '@renonext/shared';

const CATEGORY_CONFIG: Record<string, { icon: string; bg: string; iconColor: string }> = {
  plumbing: { icon: 'water-outline', bg: 'bg-blue-50', iconColor: '#3B82F6' },
  electrical: { icon: 'flash-outline', bg: 'bg-amber-50', iconColor: '#F59E0B' },
  carpentry: { icon: 'hammer-outline', bg: 'bg-orange-50', iconColor: '#F97316' },
  painting: { icon: 'color-palette-outline', bg: 'bg-purple-50', iconColor: '#8B5CF6' },
  hvac: { icon: 'thermometer-outline', bg: 'bg-red-50', iconColor: '#EF4444' },
  landscaping: { icon: 'leaf-outline', bg: 'bg-green-50', iconColor: '#22C55E' },
  cleaning: { icon: 'sparkles-outline', bg: 'bg-cyan-50', iconColor: '#06B6D4' },
  roofing: { icon: 'home-outline', bg: 'bg-slate-50', iconColor: '#64748B' },
  flooring: { icon: 'grid-outline', bg: 'bg-teal-50', iconColor: '#14B8A6' },
  general: { icon: 'construct-outline', bg: 'bg-gray-50', iconColor: '#6B7280' },
};

const DEFAULT_CONFIG = { icon: 'construct-outline', bg: 'bg-primary-50', iconColor: '#2563EB' };

export default function CategorySelectScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });
        setCategories((data ?? []) as Category[]);
      } catch {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSelectCategory = (category: Category) => {
    setSelectedId(category.id);
    // Brief delay for selection animation feedback
    setTimeout(() => {
      router.push({
        pathname: '/job/post/details',
        params: { categoryId: category.id, categoryName: category.name },
      });
    }, 200);
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-gray-500 mt-3">Loading categories...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <View className="px-6 pt-6 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-white rounded-full items-center justify-center mb-4 shadow-sm"
        >
          <Ionicons name="close" size={22} color="#374151" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">
          What do you need{'\n'}help with?
        </Text>
        <Text className="text-base text-gray-500 mt-2">
          Select a category to get started
        </Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        columnWrapperStyle={{ gap: 12 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => {
          const config = CATEGORY_CONFIG[item.slug] ?? DEFAULT_CONFIG;
          const isSelected = selectedId === item.id;

          return (
            <TouchableOpacity
              onPress={() => handleSelectCategory(item)}
              className="flex-1"
              activeOpacity={0.7}
            >
              <View
                className={`rounded-2xl p-4 h-36 justify-between border-2 ${
                  isSelected
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-transparent bg-white'
                }`}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 3,
                  elevation: 2,
                }}
              >
                <View
                  className={`w-14 h-14 ${config.bg} rounded-2xl items-center justify-center`}
                >
                  <Ionicons
                    name={config.icon as any}
                    size={28}
                    color={config.iconColor}
                  />
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm font-semibold text-gray-900 flex-1" numberOfLines={1}>
                    {item.name}
                  </Text>
                  {isSelected && (
                    <View className="w-6 h-6 bg-primary-600 rounded-full items-center justify-center">
                      <Ionicons name="checkmark" size={16} color="#ffffff" />
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
