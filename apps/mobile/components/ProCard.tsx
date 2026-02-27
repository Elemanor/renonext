import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ProWithProfile } from '@renonext/shared';
import { Avatar } from '@renonext/ui/Avatar';
import { Rating } from '@renonext/ui/Rating';
import { Badge } from '@renonext/ui/Badge';

interface ProCardProps {
  pro: ProWithProfile;
}

export default function ProCard({ pro }: ProCardProps) {
  const name = pro.profile?.full_name ?? 'Pro';
  const avatar = pro.profile?.avatar_url;

  return (
    <View
      className="bg-white rounded-2xl overflow-hidden"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View className="p-4">
        <View className="flex-row items-center">
          {/* Avatar with online indicator */}
          <View className="relative">
            <Avatar name={name} imageUrl={avatar} size="lg" />
            {pro.is_available && (
              <View className="absolute bottom-0 right-0 w-3 h-3 bg-secondary-500 rounded-full border-2 border-white" />
            )}
          </View>

          <View className="flex-1 ml-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Text className="text-base font-bold text-gray-900" numberOfLines={1}>
                  {name}
                </Text>
                <Ionicons name="checkmark-circle" size={14} color="#2563EB" className="ml-1" />
              </View>

              {/* Distance badge */}
              {pro.distance_km != null && (
                <View className="flex-row items-center bg-gray-100 rounded-lg px-2 py-1 ml-2">
                  <Ionicons name="navigate-outline" size={12} color="#6B7280" />
                  <Text className="text-xs text-gray-500 font-medium ml-0.5">
                    {pro.distance_km.toFixed(1)} km
                  </Text>
                </View>
              )}
            </View>

            {pro.headline && (
              <Text className="text-sm text-gray-500 mt-0.5" numberOfLines={1}>
                {pro.headline}
              </Text>
            )}

            <View className="flex-row items-center mt-1.5">
              <Rating rating={pro.avg_rating} size="sm" showValue reviewCount={pro.total_reviews} />
            </View>

            <View className="flex-row items-center justify-between mt-2.5">
              {/* Categories */}
              <View className="flex-row gap-1.5 flex-1 flex-wrap">
                {pro.categories?.slice(0, 2).map((cat) => (
                  <Badge
                    key={cat.category_id}
                    variant="neutral"
                    label={cat.category.name}
                    size="sm"
                  />
                ))}
                {(pro.categories?.length ?? 0) > 2 && (
                  <Badge
                    variant="neutral"
                    label={`+${(pro.categories?.length ?? 0) - 2}`}
                    size="sm"
                  />
                )}
              </View>

              {/* Hourly Rate */}
              {pro.hourly_rate_min != null && (
                <View className="bg-primary-50 rounded-lg px-2.5 py-1">
                  <Text className="text-xs font-bold text-primary-700">
                    ${pro.hourly_rate_min}-${pro.hourly_rate_max}/hr
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
