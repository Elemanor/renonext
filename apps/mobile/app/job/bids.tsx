import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getBidsForJob, acceptBid, rejectBid } from '@renonext/shared/api/bids';
import type { JobBid } from '@renonext/shared';
import { Avatar } from '@renonext/ui/Avatar';
import { Rating } from '@renonext/ui/Rating';
import { Badge } from '@renonext/ui/Badge';
import { Button } from '@renonext/ui/Button';
import EmptyState from '../../components/EmptyState';

type SortKey = 'price' | 'rating' | 'date';

export default function BidsScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const router = useRouter();
  const [bids, setBids] = useState<JobBid[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortKey>('price');

  useEffect(() => {
    const fetchBids = async () => {
      try {
        if (!jobId) return;
        const data = await getBidsForJob(jobId);
        setBids(data);
      } catch {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchBids();
  }, [jobId]);

  const sortedBids = [...bids].sort((a, b) => {
    if (sortBy === 'price') return a.amount - b.amount;
    if (sortBy === 'rating') return (b.pro?.avg_rating ?? 0) - (a.pro?.avg_rating ?? 0);
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const handleAcceptBid = (bid: JobBid) => {
    Alert.alert(
      'Accept Bid',
      `Accept ${bid.pro?.profile?.full_name}'s bid for $${bid.amount}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          onPress: async () => {
            try {
              await acceptBid(bid.id, bid.job_id);
              Alert.alert('Bid Accepted!', 'The pro has been notified.');
              router.back();
            } catch (err: unknown) {
              const msg = err instanceof Error ? err.message : 'Failed to accept bid';
              Alert.alert('Error', msg);
            }
          },
        },
      ]
    );
  };

  const handleRejectBid = async (bidId: string) => {
    try {
      await rejectBid(bidId);
      setBids((prev) =>
        prev.map((b) => (b.id === bidId ? { ...b, status: 'rejected' } : b))
      );
    } catch {
      Alert.alert('Error', 'Failed to reject bid');
    }
  };

  const renderBid = ({ item }: { item: JobBid }) => {
    const proName = item.pro?.profile?.full_name ?? 'Pro';
    const proAvatar = item.pro?.profile?.avatar_url;
    const proRating = item.pro?.avg_rating ?? 0;
    const isPending = item.status === 'pending';
    const isAccepted = item.status === 'accepted';

    return (
      <View
        className={`mx-4 mb-3 bg-white rounded-2xl overflow-hidden ${
          isAccepted ? 'border-2 border-secondary-400' : ''
        }`}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        {isAccepted && (
          <View className="bg-secondary-500 px-4 py-2 flex-row items-center">
            <Ionicons name="checkmark-circle" size={16} color="#ffffff" />
            <Text className="text-sm font-semibold text-white ml-2">Accepted Bid</Text>
          </View>
        )}

        <View className="p-4">
          {/* Pro Info */}
          <TouchableOpacity
            onPress={() => router.push(`/pro/${item.pro?.user_id}`)}
            className="flex-row items-center mb-4"
          >
            <Avatar name={proName} imageUrl={proAvatar} size="md" />
            <View className="flex-1 ml-3">
              <Text className="text-base font-bold text-gray-900">{proName}</Text>
              <Rating rating={proRating} size="sm" showValue reviewCount={item.pro?.total_reviews} />
            </View>
            <Badge
              variant={
                item.status === 'accepted'
                  ? 'success'
                  : item.status === 'rejected'
                  ? 'error'
                  : 'info'
              }
              label={item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              size="sm"
            />
          </TouchableOpacity>

          {/* Bid Details Grid */}
          <View className="bg-gray-50 rounded-xl p-3 mb-3">
            <View className="flex-row">
              <View className="flex-1 items-center border-r border-gray-200 pr-3">
                <Text className="text-xs text-gray-400 mb-0.5">Bid Amount</Text>
                <Text className="text-xl font-bold text-primary-600">${item.amount}</Text>
              </View>
              <View className="flex-1 items-center border-r border-gray-200 px-3">
                <Text className="text-xs text-gray-400 mb-0.5">Est. Hours</Text>
                <Text className="text-lg font-bold text-gray-900">{item.estimated_hours}h</Text>
              </View>
              <View className="flex-1 items-center pl-3">
                <Text className="text-xs text-gray-400 mb-0.5">Start Date</Text>
                <Text className="text-sm font-semibold text-gray-700">
                  {item.proposed_date
                    ? new Date(item.proposed_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : 'TBD'}
                </Text>
              </View>
            </View>
          </View>

          {/* Message */}
          {item.message && (
            <View className="mb-3">
              <Text className="text-sm text-gray-600 leading-5">{item.message}</Text>
            </View>
          )}

          {/* Materials */}
          {item.includes_materials && item.material_cost != null && (
            <View className="flex-row items-center mb-3 bg-blue-50 rounded-lg px-3 py-2">
              <Ionicons name="cube-outline" size={16} color="#2563EB" />
              <Text className="text-sm text-blue-700 ml-2 font-medium">
                Materials included: ${item.material_cost}
              </Text>
            </View>
          )}

          {/* Actions */}
          {isPending && (
            <View className="flex-row gap-3">
              <Button
                variant="outline"
                size="md"
                className="flex-1"
                onPress={() => handleRejectBid(item.id)}
              >
                Decline
              </Button>
              <Button
                variant="primary"
                size="md"
                className="flex-1"
                onPress={() => handleAcceptBid(item)}
                leftIcon={<Ionicons name="checkmark" size={16} color="#ffffff" />}
              >
                Accept
              </Button>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      {/* Sort Bar */}
      <View className="bg-white px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-gray-500">
            {bids.length} bid{bids.length !== 1 ? 's' : ''} received
          </Text>
          <View className="flex-row gap-2">
            {([
              { key: 'price' as SortKey, label: 'Price', icon: 'cash-outline' },
              { key: 'rating' as SortKey, label: 'Rating', icon: 'star-outline' },
              { key: 'date' as SortKey, label: 'Date', icon: 'calendar-outline' },
            ]).map((sort) => (
              <TouchableOpacity
                key={sort.key}
                onPress={() => setSortBy(sort.key)}
                className={`flex-row items-center px-3 py-1.5 rounded-full ${
                  sortBy === sort.key ? 'bg-primary-600' : 'bg-gray-100'
                }`}
              >
                <Ionicons
                  name={sort.icon as any}
                  size={14}
                  color={sortBy === sort.key ? '#ffffff' : '#6B7280'}
                />
                <Text
                  className={`text-xs font-medium ml-1 ${
                    sortBy === sort.key ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {sort.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <FlatList
        data={sortedBids}
        keyExtractor={(item) => item.id}
        renderItem={renderBid}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 20 }}
        ListEmptyComponent={
          isLoading ? (
            <View className="items-center py-16">
              <Text className="text-gray-400">Loading bids...</Text>
            </View>
          ) : (
            <EmptyState
              icon="document-text-outline"
              title="No Bids Yet"
              description="Hang tight! Pros are reviewing your job and will bid soon."
            />
          )
        }
      />
    </SafeAreaView>
  );
}
