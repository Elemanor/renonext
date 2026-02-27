import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@renonext/shared/api/supabase';
import type { Review } from '@renonext/shared';
import { Avatar } from '@renonext/ui/Avatar';
import { Rating } from '@renonext/ui/Rating';
import EmptyState from '../../components/EmptyState';

type SortMode = 'recent' | 'highest' | 'lowest';

export default function ReviewsScreen() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortMode, setSortMode] = useState<SortMode>('recent');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        let query = supabase
          .from('reviews')
          .select('*, reviewer:profiles!reviews_reviewer_id_fkey(*)')
          .eq('reviewee_id', user.id);

        if (sortMode === 'recent') {
          query = query.order('created_at', { ascending: false });
        } else if (sortMode === 'highest') {
          query = query.order('rating', { ascending: false });
        } else {
          query = query.order('rating', { ascending: true });
        }

        if (filterRating !== null) {
          query = query.eq('rating', filterRating);
        }

        const { data } = await query;
        setReviews((data ?? []) as Review[]);
      } catch {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [sortMode, filterRating]);

  // Calculate rating distribution
  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    if (ratingCounts[r.rating] !== undefined) ratingCounts[r.rating]++;
  });
  const maxCount = Math.max(...Object.values(ratingCounts), 1);

  const renderReview = ({ item }: { item: Review }) => (
    <View
      className="mx-4 mb-3 bg-white rounded-2xl p-4"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 1,
      }}
    >
      <View className="flex-row items-center mb-3">
        <Avatar
          name={item.reviewer?.full_name ?? 'Reviewer'}
          imageUrl={item.reviewer?.avatar_url}
          size="sm"
        />
        <View className="flex-1 ml-3">
          <Text className="text-sm font-bold text-gray-900">
            {item.reviewer?.full_name ?? 'Anonymous'}
          </Text>
          <Text className="text-xs text-gray-400">
            {new Date(item.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
        <Rating rating={item.rating} size="sm" />
      </View>

      {item.comment && (
        <Text className="text-sm text-gray-600 leading-5 mb-2">{item.comment}</Text>
      )}

      {item.photos && item.photos.length > 0 && (
        <View className="flex-row mt-1 gap-2">
          {item.photos.slice(0, 4).map((photo, i) => (
            <View
              key={i}
              className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden"
            >
              <Image
                source={{ uri: photo }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          ))}
          {item.photos.length > 4 && (
            <View className="w-16 h-16 rounded-xl bg-gray-200 items-center justify-center">
              <Text className="text-sm font-bold text-gray-600">+{item.photos.length - 4}</Text>
            </View>
          )}
        </View>
      )}

      {item.response && (
        <View className="mt-3 bg-gray-50 rounded-xl p-3 border-l-4 border-primary-200">
          <View className="flex-row items-center mb-1">
            <Ionicons name="arrow-undo-outline" size={14} color="#6B7280" />
            <Text className="text-xs font-bold text-gray-600 ml-1">Pro's Response</Text>
          </View>
          <Text className="text-sm text-gray-600">{item.response}</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      {/* Rating Distribution Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-100">
        {/* Distribution bars */}
        <View className="mb-4">
          {[5, 4, 3, 2, 1].map((star) => (
            <View key={star} className="flex-row items-center mb-1.5">
              <Text className="text-xs font-medium text-gray-500 w-4 text-right">{star}</Text>
              <Ionicons name="star" size={12} color="#FBBF24" className="mx-1.5" />
              <View className="flex-1 h-2 bg-gray-100 rounded-full mx-2 overflow-hidden">
                <View
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${(ratingCounts[star] / maxCount) * 100}%` }}
                />
              </View>
              <Text className="text-xs text-gray-400 w-6 text-right">
                {ratingCounts[star]}
              </Text>
            </View>
          ))}
        </View>

        {/* Sort */}
        <View className="flex-row gap-2 mb-3">
          {(['recent', 'highest', 'lowest'] as SortMode[]).map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => setSortMode(mode)}
              className={`px-4 py-2 rounded-xl ${
                sortMode === mode ? 'bg-primary-600' : 'bg-gray-100'
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  sortMode === mode ? 'text-white' : 'text-gray-600'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filter by Star */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => setFilterRating(null)}
            className={`px-3 py-1.5 rounded-full border ${
              filterRating === null ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-200'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                filterRating === null ? 'text-white' : 'text-gray-600'
              }`}
            >
              All
            </Text>
          </TouchableOpacity>
          {[5, 4, 3, 2, 1].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setFilterRating(filterRating === star ? null : star)}
              className={`flex-row items-center px-3 py-1.5 rounded-full border ${
                filterRating === star ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-200'
              }`}
            >
              <Ionicons
                name="star"
                size={12}
                color={filterRating === star ? '#FBBF24' : '#D1D5DB'}
              />
              <Text
                className={`text-xs font-semibold ml-1 ${
                  filterRating === star ? 'text-white' : 'text-gray-600'
                }`}
              >
                {star}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReview}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 20 }}
        ListEmptyComponent={
          isLoading ? (
            <View className="items-center py-16">
              <Text className="text-gray-400">Loading reviews...</Text>
            </View>
          ) : (
            <EmptyState
              icon="star-outline"
              title="No Reviews Yet"
              description="Reviews will appear here once clients rate your work."
            />
          )
        }
      />
    </SafeAreaView>
  );
}
