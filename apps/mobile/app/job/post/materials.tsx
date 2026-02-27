import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getMaterialTemplates } from '@renonext/shared/api/materials';
import type { MaterialTemplate } from '@renonext/shared';
import { Button } from '@renonext/ui/Button';
import { Badge } from '@renonext/ui/Badge';

export default function MaterialsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [materials, setMaterials] = useState<MaterialTemplate[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [handleMaterials, setHandleMaterials] = useState<'include' | 'self'>('include');

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        if (params.categoryId) {
          const data = await getMaterialTemplates(params.categoryId as string);
          setMaterials(data);
          const initial: Record<string, number> = {};
          data.forEach((m) => { initial[m.id] = 1; });
          setQuantities(initial);
        }
      } catch {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchMaterials();
  }, [params.categoryId]);

  const adjustQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] ?? 1) + delta),
    }));
  };

  const requiredMaterials = materials.filter((m) => m.is_required);
  const optionalMaterials = materials.filter((m) => !m.is_required);

  const totalEstimate = materials.reduce(
    (sum, m) => sum + m.estimated_unit_price * (quantities[m.id] ?? 1),
    0
  );

  const handleContinue = () => {
    router.push({
      pathname: '/job/post/review',
      params: {
        ...params,
        materials: handleMaterials === 'include' ? JSON.stringify(materials) : '[]',
        handleMaterials,
      },
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center shadow-sm mb-4">
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
        <Text className="text-base font-medium text-gray-700">Calculating materials...</Text>
        <Text className="text-sm text-gray-400 mt-1">Analyzing your job requirements</Text>
      </View>
    );
  }

  const renderMaterialRow = (material: MaterialTemplate) => {
    const qty = quantities[material.id] ?? 1;
    const subtotal = material.estimated_unit_price * qty;

    return (
      <View
        key={material.id}
        className="bg-white rounded-2xl p-4 mb-3"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 3,
          elevation: 1,
        }}
      >
        <View className="flex-row items-start justify-between mb-2">
          <View className="flex-1 mr-3">
            <View className="flex-row items-center">
              <Text className="text-base font-semibold text-gray-900">{material.name}</Text>
              {material.is_required && (
                <Badge variant="error" label="Required" size="sm" className="ml-2" />
              )}
            </View>
            {material.description && (
              <Text className="text-sm text-gray-500 mt-1">{material.description}</Text>
            )}
          </View>
        </View>

        {/* Quantity + Price Row */}
        <View className="flex-row items-center justify-between bg-gray-50 rounded-xl p-3 mt-1">
          {/* Stepper */}
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => adjustQuantity(material.id, -1)}
              className="w-8 h-8 bg-white rounded-lg items-center justify-center border border-gray-200"
            >
              <Ionicons name="remove" size={16} color="#6B7280" />
            </TouchableOpacity>
            <Text className="text-base font-semibold text-gray-900 mx-4 min-w-[24px] text-center">
              {qty}
            </Text>
            <TouchableOpacity
              onPress={() => adjustQuantity(material.id, 1)}
              className="w-8 h-8 bg-primary-600 rounded-lg items-center justify-center"
            >
              <Ionicons name="add" size={16} color="#ffffff" />
            </TouchableOpacity>
            <Text className="text-xs text-gray-400 ml-2">{material.unit}</Text>
          </View>

          {/* Unit Price + Subtotal */}
          <View className="items-end">
            <Text className="text-base font-bold text-gray-900">${subtotal.toFixed(2)}</Text>
            <Text className="text-xs text-gray-400">
              ${material.estimated_unit_price.toFixed(2)}/{material.unit}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold text-gray-900 mb-1">Materials Needed</Text>
        <Text className="text-base text-gray-500 mb-6">
          Based on your job details, here are the estimated materials
        </Text>

        {materials.length > 0 ? (
          <>
            {/* Required Materials */}
            {requiredMaterials.length > 0 && (
              <View className="mb-2">
                <View className="flex-row items-center mb-3">
                  <View className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  <Text className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Required Materials
                  </Text>
                </View>
                {requiredMaterials.map(renderMaterialRow)}
              </View>
            )}

            {/* Optional Materials */}
            {optionalMaterials.length > 0 && (
              <View className="mb-2">
                <View className="flex-row items-center mb-3">
                  <View className="w-2 h-2 bg-gray-400 rounded-full mr-2" />
                  <Text className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Optional Materials
                  </Text>
                </View>
                {optionalMaterials.map(renderMaterialRow)}
              </View>
            )}

            {/* No section headers if no required/optional distinction */}
            {requiredMaterials.length === 0 && optionalMaterials.length === 0 &&
              materials.map(renderMaterialRow)
            }

            {/* Total Card */}
            <View
              className="bg-white rounded-2xl p-5 mt-2 mb-6 border border-primary-100"
              style={{
                shadowColor: '#2563EB',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-sm text-gray-500">Estimated Total</Text>
                  <Text className="text-sm text-gray-400 mt-0.5">
                    {materials.length} item{materials.length !== 1 ? 's' : ''}
                  </Text>
                </View>
                <Text className="text-2xl font-bold text-primary-600">
                  ${totalEstimate.toFixed(2)}
                </Text>
              </View>
              <View className="flex-row items-center mt-3 bg-amber-50 rounded-xl px-3 py-2">
                <Ionicons name="information-circle-outline" size={16} color="#D97706" />
                <Text className="text-xs text-amber-700 ml-2 flex-1">
                  Final cost may vary based on actual quantities needed
                </Text>
              </View>
            </View>
          </>
        ) : (
          <View className="items-center py-12 bg-white rounded-2xl mb-6">
            <View className="w-16 h-16 bg-gray-50 rounded-full items-center justify-center mb-3">
              <Ionicons name="construct-outline" size={32} color="#D1D5DB" />
            </View>
            <Text className="text-lg font-semibold text-gray-900">No Standard Materials</Text>
            <Text className="text-sm text-gray-500 mt-2 text-center px-6">
              The pro will specify materials needed after reviewing your job details.
            </Text>
          </View>
        )}

        {/* Material Handling Options */}
        <Text className="text-lg font-bold text-gray-900 mb-3">How to handle materials?</Text>

        <TouchableOpacity
          onPress={() => setHandleMaterials('include')}
          className={`rounded-2xl mb-3 border-2 overflow-hidden ${
            handleMaterials === 'include'
              ? 'border-primary-600 bg-primary-50'
              : 'border-gray-200 bg-white'
          }`}
          activeOpacity={0.7}
        >
          <View className="p-4 flex-row items-center">
            <View
              className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                handleMaterials === 'include' ? 'border-primary-600 bg-primary-600' : 'border-gray-300'
              }`}
            >
              {handleMaterials === 'include' && (
                <Ionicons name="checkmark" size={14} color="#ffffff" />
              )}
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-900">Include in Posting</Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                Material estimates will be visible to bidding pros
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setHandleMaterials('self')}
          className={`rounded-2xl mb-6 border-2 overflow-hidden ${
            handleMaterials === 'self'
              ? 'border-primary-600 bg-primary-50'
              : 'border-gray-200 bg-white'
          }`}
          activeOpacity={0.7}
        >
          <View className="p-4 flex-row items-center">
            <View
              className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                handleMaterials === 'self' ? 'border-primary-600 bg-primary-600' : 'border-gray-300'
              }`}
            >
              {handleMaterials === 'self' && (
                <Ionicons name="checkmark" size={14} color="#ffffff" />
              )}
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-900">I'll Handle Materials</Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                I'll purchase or provide the materials myself
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <Button variant="primary" size="lg" onPress={handleContinue}>
          Continue to Review
        </Button>

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
