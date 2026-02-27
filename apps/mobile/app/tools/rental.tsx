import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@renonext/shared/api/supabase';
import type { ToolRental } from '@renonext/shared';
import { Badge } from '@renonext/ui/Badge';
import EmptyState from '../../components/EmptyState';

const STATUS_CONFIG: Record<string, { badge: string; icon: string; color: string; bg: string }> = {
  reserved: { badge: 'info', icon: 'time-outline', color: '#2563EB', bg: 'bg-blue-50' },
  active: { badge: 'warning', icon: 'construct-outline', color: '#D97706', bg: 'bg-amber-50' },
  returned: { badge: 'success', icon: 'checkmark-circle-outline', color: '#059669', bg: 'bg-green-50' },
  cancelled: { badge: 'error', icon: 'close-circle-outline', color: '#EF4444', bg: 'bg-red-50' },
};

type TabKey = 'active' | 'upcoming' | 'past';

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'active', label: 'Active', icon: 'construct-outline' },
  { key: 'upcoming', label: 'Upcoming', icon: 'calendar-outline' },
  { key: 'past', label: 'Past', icon: 'time-outline' },
];

export default function RentalScreen() {
  const [rentals, setRentals] = useState<ToolRental[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('active');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data } = await supabase
          .from('tool_rentals')
          .select('*, tool:tools(*)')
          .eq('pro_id', user.id)
          .order('rental_start', { ascending: false });
        setRentals((data ?? []) as ToolRental[]);
      } catch {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const now = new Date();
  const filteredRentals = rentals.filter((r) => {
    const start = new Date(r.rental_start);
    const end = new Date(r.rental_end);
    if (activeTab === 'active') return r.status === 'active' || (start <= now && end >= now);
    if (activeTab === 'upcoming') return r.status === 'reserved' && start > now;
    return r.status === 'returned' || r.status === 'cancelled' || end < now;
  });

  const formatDateRange = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${s.toLocaleDateString('en-US', opts)} - ${e.toLocaleDateString('en-US', opts)}`;
  };

  const getDaysRemaining = (end: string) => {
    const days = Math.ceil((new Date(end).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Ended';
    if (days === 0) return 'Due today';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      {/* Tabs */}
      <View className="bg-white px-4 py-3 border-b border-gray-100">
        <View className="flex-row gap-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            const count = rentals.filter((r) => {
              const start = new Date(r.rental_start);
              const end = new Date(r.rental_end);
              if (tab.key === 'active') return r.status === 'active' || (start <= now && end >= now);
              if (tab.key === 'upcoming') return r.status === 'reserved' && start > now;
              return r.status === 'returned' || r.status === 'cancelled' || end < now;
            }).length;

            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                className={`flex-1 flex-row items-center justify-center py-2.5 rounded-xl ${
                  isActive ? 'bg-primary-600' : 'bg-gray-100'
                }`}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={16}
                  color={isActive ? '#ffffff' : '#6B7280'}
                />
                <Text
                  className={`text-sm font-semibold ml-1.5 ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {tab.label}
                </Text>
                {count > 0 && (
                  <View
                    className={`ml-1.5 w-5 h-5 rounded-full items-center justify-center ${
                      isActive ? 'bg-white/20' : 'bg-gray-200'
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        isActive ? 'text-white' : 'text-gray-500'
                      }`}
                    >
                      {count}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <FlatList
        data={filteredRentals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
        renderItem={({ item }) => {
          const config = STATUS_CONFIG[item.status] ?? STATUS_CONFIG.reserved;
          const isActive = item.status === 'active';

          return (
            <View
              className={`mx-4 mb-3 bg-white rounded-2xl overflow-hidden ${
                isActive ? 'border-l-4 border-amber-500' : ''
              }`}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.04,
                shadowRadius: 3,
                elevation: 1,
              }}
            >
              <View className="p-4">
                <View className="flex-row items-center">
                  {/* Tool Icon */}
                  <View
                    className={`w-14 h-14 ${config.bg} rounded-2xl items-center justify-center mr-3`}
                  >
                    <Ionicons name={config.icon as any} size={24} color={config.color} />
                  </View>

                  {/* Rental Info */}
                  <View className="flex-1">
                    <Text className="text-base font-bold text-gray-900">
                      {item.tool?.name ?? 'Tool'}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
                      <Text className="text-sm text-gray-500 ml-1">
                        {formatDateRange(item.rental_start, item.rental_end)}
                      </Text>
                    </View>
                    <View className="flex-row items-center mt-2 gap-2">
                      <Badge variant={config.badge as any} label={item.status} size="sm" />
                      {isActive && (
                        <View className="bg-amber-50 rounded-lg px-2 py-0.5">
                          <Text className="text-xs font-semibold text-amber-700">
                            {getDaysRemaining(item.rental_end)}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Price */}
                  <View className="items-end">
                    <Text className="text-lg font-bold text-gray-900">
                      ${item.total_cost.toFixed(2)}
                    </Text>
                    <Text className="text-xs text-gray-400">total</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          isLoading ? (
            <View className="items-center py-16">
              <Text className="text-gray-400">Loading rentals...</Text>
            </View>
          ) : (
            <EmptyState
              icon={
                activeTab === 'active'
                  ? 'construct-outline'
                  : activeTab === 'upcoming'
                  ? 'calendar-outline'
                  : 'time-outline'
              }
              title={`No ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Rentals`}
              description={
                activeTab === 'active'
                  ? 'You have no active tool rentals.'
                  : activeTab === 'upcoming'
                  ? 'No upcoming tool reservations.'
                  : 'No past rental history.'
              }
            />
          )
        }
      />
    </SafeAreaView>
  );
}
