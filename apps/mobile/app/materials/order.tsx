import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getJobMaterials, createMaterialOrder } from '@renonext/shared/api/materials';
import { supabase } from '@renonext/shared/api/supabase';
import { getJob } from '@renonext/shared/api/jobs';
import type { JobMaterial } from '@renonext/shared';
import { HST_RATE } from '@renonext/shared/constants/config';
import { Button } from '@renonext/ui/Button';
import { Input } from '@renonext/ui/Input';

export default function OrderScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const router = useRouter();
  const [materials, setMaterials] = useState<JobMaterial[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isOrdering, setIsOrdering] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!jobId) return;
        const mats = await getJobMaterials(jobId);
        setMaterials(mats.filter((m) => m.status === 'confirmed' || m.status === 'estimated'));
        const job = await getJob(jobId);
        setDeliveryAddress(job.address);
      } catch {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [jobId]);

  const subtotal = materials.reduce((sum, m) => sum + (m.total_price ?? 0), 0);
  const tax = subtotal * HST_RATE;
  const deliveryFee = subtotal > 200 ? 0 : 15;
  const total = subtotal + tax + deliveryFee;

  const handleOrder = async () => {
    if (!deliveryAddress.trim()) {
      Alert.alert('Error', 'Please enter a delivery address');
      return;
    }
    setIsOrdering(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !jobId) throw new Error('Not authenticated');

      const job = await getJob(jobId);

      await createMaterialOrder({
        job_id: jobId,
        client_id: user.id,
        pro_id: job.assigned_pro_id ?? '',
        items: materials.map((m) => ({
          material_id: m.id,
          name: m.name,
          quantity: m.quantity,
          unit_price: m.unit_price ?? 0,
          total_price: m.total_price ?? 0,
        })),
        delivery_address: deliveryAddress,
      });

      Alert.alert('Order Placed!', 'Your material order has been submitted.', [
        { text: 'Track Order', onPress: () => router.replace('/materials/tracking') },
      ]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to place order';
      Alert.alert('Error', msg);
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 16 }}>
        {/* Header */}
        <View className="flex-row items-center mb-5">
          <View className="w-12 h-12 bg-primary-50 rounded-2xl items-center justify-center mr-3">
            <Ionicons name="cart-outline" size={24} color="#2563EB" />
          </View>
          <View>
            <Text className="text-2xl font-bold text-gray-900">Order Summary</Text>
            <Text className="text-sm text-gray-500">{materials.length} items ready to order</Text>
          </View>
        </View>

        {/* Items */}
        <Text className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
          Items
        </Text>
        <View
          className="bg-white rounded-2xl overflow-hidden mb-5"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 3,
            elevation: 1,
          }}
        >
          {materials.map((mat, index) => (
            <View
              key={mat.id}
              className={`flex-row justify-between items-center px-4 py-3.5 ${
                index < materials.length - 1 ? 'border-b border-gray-50' : ''
              }`}
            >
              <View className="flex-row items-center flex-1 mr-3">
                <View className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center mr-3">
                  <Text className="text-xs font-bold text-gray-400">{index + 1}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-gray-900">{mat.name}</Text>
                  <Text className="text-xs text-gray-400 mt-0.5">
                    {mat.quantity} {mat.unit}
                    {mat.unit_price ? ` @ $${mat.unit_price.toFixed(2)}` : ''}
                  </Text>
                </View>
              </View>
              <Text className="text-sm font-bold text-gray-900">
                ${(mat.total_price ?? 0).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Delivery Address */}
        <Text className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
          Delivery
        </Text>
        <View
          className="bg-white rounded-2xl p-4 mb-5"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 3,
            elevation: 1,
          }}
        >
          <Input
            label="Delivery Address"
            placeholder="Enter delivery address"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
            leftIcon={<Ionicons name="location-outline" size={20} color="#9CA3AF" />}
          />
          {deliveryFee === 0 && (
            <View className="flex-row items-center mt-2 bg-green-50 rounded-xl px-3 py-2">
              <Ionicons name="checkmark-circle" size={16} color="#059669" />
              <Text className="text-xs text-green-700 font-medium ml-1.5">
                Free delivery on orders over $200
              </Text>
            </View>
          )}
        </View>

        {/* Pricing Breakdown */}
        <Text className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
          Payment Summary
        </Text>
        <View
          className="bg-white rounded-2xl p-4 mb-6"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 3,
            elevation: 1,
          }}
        >
          <View className="flex-row justify-between mb-3">
            <Text className="text-sm text-gray-500">Subtotal</Text>
            <Text className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-sm text-gray-500">HST (13%)</Text>
            <Text className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-500">Delivery</Text>
              {deliveryFee === 0 && (
                <View className="ml-2 bg-green-50 rounded-md px-1.5 py-0.5">
                  <Text className="text-xs text-green-600 font-bold">FREE</Text>
                </View>
              )}
            </View>
            <Text className="text-sm font-medium text-gray-900">
              {deliveryFee === 0 ? '$0.00' : `$${deliveryFee.toFixed(2)}`}
            </Text>
          </View>
          <View className="h-px bg-gray-100 my-2" />
          <View className="flex-row justify-between items-center">
            <Text className="text-base font-bold text-gray-900">Total</Text>
            <Text className="text-2xl font-bold text-primary-600">${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Order Button */}
        <Button variant="primary" size="lg" loading={isOrdering} onPress={handleOrder}>
          <View className="flex-row items-center justify-center">
            <Ionicons name="lock-closed-outline" size={18} color="#ffffff" />
            <Text className="text-white font-semibold text-base ml-2">
              Place Order - ${total.toFixed(2)}
            </Text>
          </View>
        </Button>

        {/* Security Note */}
        <View className="flex-row items-center justify-center mt-4 mb-8">
          <Ionicons name="shield-checkmark-outline" size={14} color="#9CA3AF" />
          <Text className="text-xs text-gray-400 ml-1">Secure, encrypted payment</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
