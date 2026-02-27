import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '@renonext/ui/Badge';
import EmptyState from '../../components/EmptyState';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiry: string;
  isDefault: boolean;
}

const CARD_CONFIG: Record<string, { icon: string; color: string; bg: string; label: string }> = {
  visa: { icon: 'card-outline', color: '#1A1F71', bg: 'bg-blue-50', label: 'Visa' },
  mastercard: { icon: 'card-outline', color: '#EB001B', bg: 'bg-red-50', label: 'Mastercard' },
  amex: { icon: 'card-outline', color: '#006FCF', bg: 'bg-cyan-50', label: 'Amex' },
};

function PaymentCard({
  method,
  onSetDefault,
  onDelete,
}: {
  method: PaymentMethod;
  onSetDefault: () => void;
  onDelete: () => void;
}) {
  const config = CARD_CONFIG[method.type] ?? CARD_CONFIG.visa;

  return (
    <View
      className={`bg-white rounded-2xl mx-4 mb-3 overflow-hidden ${
        method.isDefault ? 'border-2 border-primary-600' : ''
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
          <View
            className={`w-12 h-12 ${config.bg} rounded-xl items-center justify-center mr-3`}
          >
            <Ionicons name={config.icon as any} size={24} color={config.color} />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              <Text className="text-base font-bold text-gray-900">
                {config.label}
              </Text>
              <Text className="text-base text-gray-500">
                **** {method.last4}
              </Text>
              {method.isDefault && (
                <Badge variant="info" label="Default" size="sm" />
              )}
            </View>
            <Text className="text-sm text-gray-400 mt-0.5">
              Expires {method.expiry}
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View className="flex-row mt-3 pt-3 border-t border-gray-50 gap-3">
          {!method.isDefault && (
            <TouchableOpacity
              onPress={onSetDefault}
              className="flex-row items-center"
            >
              <Ionicons name="checkmark-circle-outline" size={16} color="#2563EB" />
              <Text className="text-sm text-primary-600 font-medium ml-1">
                Set Default
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={onDelete}
            className="flex-row items-center ml-auto"
          >
            <Ionicons name="trash-outline" size={16} color="#EF4444" />
            <Text className="text-sm text-red-500 font-medium ml-1">Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function PaymentMethodsScreen() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);

  const handleAddCard = () => {
    Alert.alert('Add Card', 'Card addition flow would open here with Stripe integration.');
  };

  const handleDelete = (id: string) => {
    Alert.alert('Remove Card', 'Are you sure you want to remove this card?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => setMethods((prev) => prev.filter((m) => m.id !== id)),
      },
    ]);
  };

  const handleSetDefault = (id: string) => {
    setMethods((prev) =>
      prev.map((m) => ({ ...m, isDefault: m.id === id }))
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Payment Methods' }} />
      <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
        <FlatList
          data={methods}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 20, flexGrow: 1 }}
          renderItem={({ item }) => (
            <PaymentCard
              method={item}
              onSetDefault={() => handleSetDefault(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          ListHeaderComponent={
            methods.length > 0 ? (
              <View className="mx-4 mb-4">
                <View
                  className="bg-primary-50 rounded-2xl p-4 flex-row items-center"
                  style={{
                    shadowColor: '#2563EB',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                >
                  <View className="w-10 h-10 bg-primary-100 rounded-xl items-center justify-center mr-3">
                    <Ionicons name="shield-checkmark-outline" size={20} color="#2563EB" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-primary-800">
                      Secure Payments
                    </Text>
                    <Text className="text-xs text-primary-600 mt-0.5">
                      All transactions are encrypted and secure
                    </Text>
                  </View>
                </View>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <EmptyState
              icon="card-outline"
              title="No Payment Methods"
              description="Add a card to pay for jobs and materials."
              actionLabel="Add Card"
              onAction={handleAddCard}
            />
          }
          ListFooterComponent={
            methods.length > 0 ? (
              <TouchableOpacity
                onPress={handleAddCard}
                className="mx-4 mt-2 bg-white rounded-2xl p-4 flex-row items-center justify-center border-2 border-dashed border-gray-200"
                activeOpacity={0.7}
              >
                <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-3">
                  <Ionicons name="add" size={22} color="#2563EB" />
                </View>
                <Text className="text-base font-semibold text-primary-600">
                  Add New Card
                </Text>
              </TouchableOpacity>
            ) : null
          }
        />
      </SafeAreaView>
    </>
  );
}
