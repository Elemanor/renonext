import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getJobMaterials, updateJobMaterial } from '@renonext/shared/api/materials';
import type { JobMaterial } from '@renonext/shared';
import { Badge } from '@renonext/ui/Badge';
import { Button } from '@renonext/ui/Button';
import EmptyState from '../../components/EmptyState';

const STATUS_CONFIG: Record<string, { badge: string; icon: string; color: string; bg: string }> = {
  estimated: { badge: 'neutral', icon: 'time-outline', color: '#6B7280', bg: 'bg-gray-50' },
  confirmed: { badge: 'info', icon: 'checkmark-circle-outline', color: '#2563EB', bg: 'bg-blue-50' },
  purchased: { badge: 'warning', icon: 'cart-outline', color: '#D97706', bg: 'bg-amber-50' },
  used: { badge: 'success', icon: 'checkmark-done-outline', color: '#059669', bg: 'bg-green-50' },
};

export default function MaterialListScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const router = useRouter();
  const [materials, setMaterials] = useState<JobMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!jobId) return;
        const data = await getJobMaterials(jobId);
        setMaterials(data);
      } catch {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [jobId]);

  const handleApprove = async (material: JobMaterial) => {
    try {
      const updated = await updateJobMaterial(material.id, { status: 'confirmed' });
      setMaterials((prev) =>
        prev.map((m) => (m.id === material.id ? updated : m))
      );
    } catch {
      Alert.alert('Error', 'Failed to approve material');
    }
  };

  const total = materials.reduce((sum, m) => sum + (m.total_price ?? 0), 0);
  const approvedCount = materials.filter((m) => m.status !== 'estimated').length;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <FlatList
        data={materials}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
        ListHeaderComponent={
          <View className="mb-4">
            {/* Total Card */}
            <View
              className="mx-4 bg-white rounded-2xl p-4"
              style={{
                shadowColor: '#2563EB',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-primary-50 rounded-xl items-center justify-center mr-3">
                    <Ionicons name="receipt-outline" size={20} color="#2563EB" />
                  </View>
                  <View>
                    <Text className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                      Total Estimated
                    </Text>
                    <Text className="text-2xl font-bold text-primary-600">
                      ${total.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-xs text-gray-400">{materials.length} items</Text>
                  <Text className="text-xs text-green-600 font-medium">
                    {approvedCount} approved
                  </Text>
                </View>
              </View>
            </View>

            {/* Section Header */}
            <Text className="text-xs font-bold text-gray-400 px-4 mt-5 mb-2 uppercase tracking-wider">
              Materials List
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const config = STATUS_CONFIG[item.status] ?? STATUS_CONFIG.estimated;

          return (
            <View
              className="mx-4 mb-3 bg-white rounded-2xl overflow-hidden"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.04,
                shadowRadius: 3,
                elevation: 1,
              }}
            >
              <View className="p-4">
                <View className="flex-row items-start">
                  <View
                    className={`w-10 h-10 ${config.bg} rounded-xl items-center justify-center mr-3 mt-0.5`}
                  >
                    <Ionicons name={config.icon as any} size={18} color={config.color} />
                  </View>
                  <View className="flex-1 mr-3">
                    <Text className="text-base font-semibold text-gray-900">{item.name}</Text>
                    {item.description && (
                      <Text className="text-sm text-gray-500 mt-0.5" numberOfLines={2}>
                        {item.description}
                      </Text>
                    )}
                    <View className="flex-row items-center mt-2 gap-2">
                      <View className="bg-gray-50 rounded-lg px-2 py-1">
                        <Text className="text-xs text-gray-500 font-medium">
                          {item.quantity} {item.unit}
                        </Text>
                      </View>
                      <Badge variant={config.badge as any} label={item.status} size="sm" />
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-base font-bold text-gray-900">
                      ${(item.total_price ?? 0).toFixed(2)}
                    </Text>
                    {item.unit_price && (
                      <Text className="text-xs text-gray-400 mt-0.5">
                        ${item.unit_price.toFixed(2)}/{item.unit}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Approve Action */}
                {item.status === 'estimated' && (
                  <TouchableOpacity
                    onPress={() => handleApprove(item)}
                    className="mt-3 pt-3 border-t border-gray-50 flex-row items-center justify-center bg-primary-50 rounded-xl py-2.5"
                    activeOpacity={0.7}
                  >
                    <Ionicons name="checkmark-circle-outline" size={18} color="#2563EB" />
                    <Text className="text-primary-600 text-sm font-semibold ml-1.5">
                      Approve Material
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          isLoading ? (
            <View className="items-center py-16">
              <Text className="text-gray-400">Loading materials...</Text>
            </View>
          ) : (
            <EmptyState
              icon="construct-outline"
              title="No Materials"
              description="No materials have been added for this job yet."
            />
          )
        }
      />

      {/* Bottom Action */}
      {materials.length > 0 && (
        <View
          className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 8,
          }}
        >
          <SafeAreaView edges={['bottom']}>
            <Button
              variant="primary"
              size="lg"
              onPress={() =>
                router.push({ pathname: '/materials/order', params: { jobId } })
              }
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="cart-outline" size={20} color="#ffffff" />
                <Text className="text-white font-semibold text-base ml-2">
                  Order Materials - ${total.toFixed(2)}
                </Text>
              </View>
            </Button>
          </SafeAreaView>
        </View>
      )}
    </SafeAreaView>
  );
}
