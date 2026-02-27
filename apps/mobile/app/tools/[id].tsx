import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@renonext/shared/api/supabase';
import type { Tool } from '@renonext/shared';
import { Button } from '@renonext/ui/Button';
import { Badge } from '@renonext/ui/Badge';
import LoadingScreen from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';

interface DetailItemProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  highlight?: boolean;
}

function DetailItem({ icon, iconBg, iconColor, label, value, highlight = false }: DetailItemProps) {
  return (
    <View className="flex-row items-center py-3">
      <View className={`w-10 h-10 ${iconBg} rounded-xl items-center justify-center mr-3`}>
        <Ionicons name={icon as any} size={18} color={iconColor} />
      </View>
      <View className="flex-1">
        <Text className="text-xs text-gray-400 uppercase tracking-wider">{label}</Text>
        <Text className={`text-sm font-semibold ${highlight ? 'text-primary-600' : 'text-gray-900'} mt-0.5`}>
          {value}
        </Text>
      </View>
    </View>
  );
}

export default function ToolDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [tool, setTool] = useState<Tool | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) throw new Error('No tool ID');
        const { data, error: err } = await supabase
          .from('tools')
          .select('*')
          .eq('id', id)
          .single();
        if (err) throw err;
        setTool(data as Tool);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Tool not found');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) return <LoadingScreen message="Loading tool details..." />;
  if (error || !tool) return <ErrorScreen message={error ?? 'Tool not found'} onRetry={() => router.back()} />;

  const handleReserve = () => {
    Alert.alert(
      'Reserve Tool',
      `Reserve ${tool.name} at $${tool.daily_rental_price}/day?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reserve',
          onPress: () => Alert.alert('Reserved!', 'Tool reservation confirmed.'),
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Image Area */}
        <View className="h-64 bg-gradient-to-b from-amber-50 to-amber-100 items-center justify-center">
          <View
            className="w-24 h-24 bg-white rounded-3xl items-center justify-center"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Ionicons name="hammer-outline" size={48} color="#D97706" />
          </View>
        </View>

        {/* Tool Info Card */}
        <View
          className="mx-4 -mt-6 bg-white rounded-2xl p-5"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 6,
            elevation: 3,
          }}
        >
          <View className="flex-row items-start justify-between">
            <View className="flex-1 mr-3">
              <Text className="text-2xl font-bold text-gray-900">{tool.name}</Text>
              <Badge variant="success" label="Available" className="mt-2" />
            </View>
            {tool.daily_rental_price != null && (
              <View className="items-end">
                <Text className="text-3xl font-bold text-primary-600">
                  ${tool.daily_rental_price}
                </Text>
                <Text className="text-sm text-gray-400">/day</Text>
              </View>
            )}
          </View>
        </View>

        {/* Description */}
        {tool.description && (
          <View className="mx-4 mt-4">
            <Text className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
              Description
            </Text>
            <View
              className="bg-white rounded-2xl p-4"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.04,
                shadowRadius: 3,
                elevation: 1,
              }}
            >
              <Text className="text-sm text-gray-600 leading-6">{tool.description}</Text>
            </View>
          </View>
        )}

        {/* Details */}
        <View className="mx-4 mt-4">
          <Text className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
            Details
          </Text>
          <View
            className="bg-white rounded-2xl px-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 3,
              elevation: 1,
            }}
          >
            <DetailItem
              icon="cash-outline"
              iconBg="bg-green-50"
              iconColor="#059669"
              label="Daily Rate"
              value={`$${tool.daily_rental_price ?? 'N/A'}`}
              highlight
            />
            <View className="h-px bg-gray-50" />
            <DetailItem
              icon="shield-checkmark-outline"
              iconBg="bg-purple-50"
              iconColor="#8B5CF6"
              label="Deposit"
              value="Required"
            />
            <View className="h-px bg-gray-50" />
            <DetailItem
              icon="checkmark-circle-outline"
              iconBg="bg-blue-50"
              iconColor="#2563EB"
              label="Condition"
              value="Good"
            />
            <View className="h-px bg-gray-50" />
            <DetailItem
              icon="time-outline"
              iconBg="bg-amber-50"
              iconColor="#D97706"
              label="Min. Rental"
              value="1 day"
            />
          </View>
        </View>

        {/* Availability Calendar Placeholder */}
        <View className="mx-4 mt-4 mb-6">
          <Text className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
            Availability
          </Text>
          <View
            className="bg-white rounded-2xl p-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 3,
              elevation: 1,
            }}
          >
            <View className="h-36 bg-gray-50 rounded-xl items-center justify-center">
              <View className="w-14 h-14 bg-amber-50 rounded-2xl items-center justify-center mb-3">
                <Ionicons name="calendar-outline" size={28} color="#D97706" />
              </View>
              <Text className="text-sm font-semibold text-gray-900">Calendar View</Text>
              <Text className="text-xs text-gray-400 mt-1">Coming soon</Text>
            </View>
          </View>
        </View>

        <View className="h-24" />
      </ScrollView>

      {/* Reserve Button */}
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
          <View className="flex-row items-center">
            {tool.daily_rental_price != null && (
              <View className="mr-4">
                <Text className="text-xs text-gray-400">Price</Text>
                <Text className="text-xl font-bold text-primary-600">
                  ${tool.daily_rental_price}/day
                </Text>
              </View>
            )}
            <View className="flex-1">
              <Button variant="primary" size="lg" onPress={handleReserve}>
                <View className="flex-row items-center justify-center">
                  <Ionicons name="calendar-outline" size={18} color="#ffffff" />
                  <Text className="text-white font-semibold text-base ml-2">Reserve Tool</Text>
                </View>
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
}
