import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@renonext/shared/api/supabase';
import { getOrders } from '@renonext/shared/api/materials';
import type { MaterialOrder, OrderStatus } from '@renonext/shared';
import { Badge } from '@renonext/ui/Badge';
import EmptyState from '../../components/EmptyState';

const ORDER_STEPS: { status: OrderStatus; label: string; icon: string; description: string }[] = [
  { status: 'pending', label: 'Order Placed', icon: 'document-text-outline', description: 'Your order has been received' },
  { status: 'confirmed', label: 'Confirmed', icon: 'checkmark-circle-outline', description: 'Supplier confirmed your order' },
  { status: 'shipped', label: 'Shipped', icon: 'car-outline', description: 'On the way to delivery address' },
  { status: 'delivered', label: 'Delivered', icon: 'home-outline', description: 'Delivered to your location' },
];

const STATUS_CONFIG: Record<string, { badge: string; color: string; bg: string }> = {
  pending: { badge: 'info', color: '#2563EB', bg: 'bg-blue-50' },
  confirmed: { badge: 'info', color: '#2563EB', bg: 'bg-blue-50' },
  shipped: { badge: 'warning', color: '#D97706', bg: 'bg-amber-50' },
  delivered: { badge: 'success', color: '#059669', bg: 'bg-green-50' },
  cancelled: { badge: 'error', color: '#EF4444', bg: 'bg-red-50' },
};

export default function TrackingScreen() {
  const [orders, setOrders] = useState<MaterialOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const data = await getOrders(user.id);
        setOrders(data);
        if (data.length > 0) setExpandedOrder(data[0].id);
      } catch {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStepIndex = (status: OrderStatus) => {
    return ORDER_STEPS.findIndex((s) => s.status === status);
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-gray-400">Loading orders...</Text>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
        <EmptyState
          icon="cube-outline"
          title="No Orders"
          description="You haven't placed any material orders yet."
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 16 }}>
        {orders.map((order) => {
          const currentStep = getStepIndex(order.status);
          const statusConfig = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
          const isExpanded = expandedOrder === order.id;

          return (
            <TouchableOpacity
              key={order.id}
              onPress={() => setExpandedOrder(isExpanded ? null : order.id)}
              activeOpacity={0.9}
              className="mb-4"
            >
              <View
                className="bg-white rounded-2xl overflow-hidden"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              >
                {/* Order Header */}
                <View className="p-4 flex-row justify-between items-center">
                  <View className="flex-row items-center flex-1">
                    <View
                      className={`w-10 h-10 ${statusConfig.bg} rounded-xl items-center justify-center mr-3`}
                    >
                      <Ionicons name="cube-outline" size={20} color={statusConfig.color} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-bold text-gray-900">
                        Order #{order.id.slice(0, 8)}
                      </Text>
                      <Text className="text-xs text-gray-400 mt-0.5">
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <Badge variant={statusConfig.badge as any} label={order.status} />
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color="#9CA3AF"
                      style={{ marginLeft: 8 }}
                    />
                  </View>
                </View>

                {isExpanded && (
                  <>
                    {/* Step Tracker - Vertical */}
                    <View className="px-4 pb-4">
                      <View className="bg-gray-50 rounded-2xl p-4">
                        {ORDER_STEPS.map((step, index) => {
                          const isCompleted = index <= currentStep;
                          const isCurrent = index === currentStep;

                          return (
                            <View key={step.status} className="flex-row">
                              {/* Step Indicator Column */}
                              <View className="items-center mr-4">
                                <View
                                  className={`w-10 h-10 rounded-full items-center justify-center ${
                                    isCompleted
                                      ? isCurrent
                                        ? 'bg-primary-600'
                                        : 'bg-secondary-500'
                                      : 'bg-gray-200'
                                  }`}
                                  style={
                                    isCurrent
                                      ? {
                                          shadowColor: '#2563EB',
                                          shadowOffset: { width: 0, height: 2 },
                                          shadowOpacity: 0.3,
                                          shadowRadius: 4,
                                          elevation: 3,
                                        }
                                      : undefined
                                  }
                                >
                                  {isCompleted && !isCurrent ? (
                                    <Ionicons name="checkmark" size={20} color="#ffffff" />
                                  ) : (
                                    <Ionicons
                                      name={step.icon as any}
                                      size={18}
                                      color={isCompleted ? '#ffffff' : '#9CA3AF'}
                                    />
                                  )}
                                </View>
                                {/* Connector Line */}
                                {index < ORDER_STEPS.length - 1 && (
                                  <View
                                    className={`w-0.5 h-8 ${
                                      index < currentStep ? 'bg-secondary-500' : 'bg-gray-200'
                                    }`}
                                  />
                                )}
                              </View>

                              {/* Step Content */}
                              <View className="flex-1 pb-4">
                                <Text
                                  className={`text-sm font-semibold ${
                                    isCompleted ? 'text-gray-900' : 'text-gray-400'
                                  }`}
                                >
                                  {step.label}
                                </Text>
                                <Text className="text-xs text-gray-400 mt-0.5">
                                  {step.description}
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    </View>

                    {/* Order Details */}
                    <View className="px-4 pb-4">
                      <View className="bg-gray-50 rounded-2xl p-4">
                        <View className="flex-row justify-between mb-2.5">
                          <View className="flex-row items-center">
                            <Ionicons name="layers-outline" size={16} color="#6B7280" />
                            <Text className="text-sm text-gray-500 ml-1.5">Items</Text>
                          </View>
                          <Text className="text-sm font-semibold text-gray-900">
                            {order.items.length}
                          </Text>
                        </View>
                        <View className="flex-row justify-between mb-2.5">
                          <View className="flex-row items-center">
                            <Ionicons name="cash-outline" size={16} color="#6B7280" />
                            <Text className="text-sm text-gray-500 ml-1.5">Total</Text>
                          </View>
                          <Text className="text-sm font-bold text-primary-600">
                            ${order.total.toFixed(2)}
                          </Text>
                        </View>
                        {order.tracking_number && (
                          <View className="flex-row justify-between mb-2.5">
                            <View className="flex-row items-center">
                              <Ionicons name="barcode-outline" size={16} color="#6B7280" />
                              <Text className="text-sm text-gray-500 ml-1.5">Tracking</Text>
                            </View>
                            <Text className="text-sm font-medium text-primary-600">
                              {order.tracking_number}
                            </Text>
                          </View>
                        )}
                        {order.delivery_date && (
                          <View className="flex-row justify-between">
                            <View className="flex-row items-center">
                              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                              <Text className="text-sm text-gray-500 ml-1.5">Est. Delivery</Text>
                            </View>
                            <Text className="text-sm font-semibold text-gray-900">
                              {new Date(order.delivery_date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
