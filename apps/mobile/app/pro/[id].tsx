import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@renonext/shared/api/supabase';
import { getProfile, getProProfile } from '@renonext/shared/api/profiles';
import type { Profile, ProProfile } from '@renonext/shared';
import { Avatar } from '@renonext/ui/Avatar';
import { Badge } from '@renonext/ui/Badge';
import { Rating } from '@renonext/ui/Rating';
import { Button } from '@renonext/ui/Button';
import { ImageGallery } from '@renonext/ui/ImageGallery';
import ErrorScreen from '../../components/ErrorScreen';
import LoadingScreen from '../../components/LoadingScreen';

const STATUS_CONFIG: Record<string, { variant: any; color: string; label: string }> = {
  available: { variant: 'success', color: '#059669', label: 'Available' },
  working: { variant: 'warning', color: '#D97706', label: 'Working' },
  offline: { variant: 'neutral', color: '#6B7280', label: 'Offline' },
};

export default function ProProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [proProfile, setProProfile] = useState<ProProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<{ url: string }[]>([]);

  useEffect(() => {
    const fetchProData = async () => {
      try {
        if (!id) throw new Error('No pro ID provided');
        const p = await getProfile(id);
        setProfile(p);
        const pp = await getProProfile(id);
        setProProfile(pp);

        const { data: gallery } = await supabase.storage
          .from('gallery')
          .list(`gallery/${id}`, { limit: 20 });
        if (gallery && gallery.length > 0) {
          const images = gallery.map((file) => ({
            url: supabase.storage.from('gallery').getPublicUrl(`gallery/${id}/${file.name}`).data.publicUrl,
          }));
          setGalleryImages(images);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to load profile';
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProData();
  }, [id]);

  if (isLoading) return <LoadingScreen message="Loading profile..." />;
  if (error || !profile || !proProfile) {
    return <ErrorScreen message={error ?? 'Profile not found'} onRetry={() => router.back()} />;
  }

  const statusConfig = STATUS_CONFIG[proProfile.current_status] ?? STATUS_CONFIG.offline;

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Cover & Profile Header */}
        <View className="bg-gradient-to-b from-primary-600 to-primary-700 h-36" />
        <View className="bg-white px-6 pb-6 -mt-12">
          <View className="items-center">
            <View className="border-4 border-white rounded-full">
              <Avatar name={profile.full_name} imageUrl={profile.avatar_url} size="xl" />
            </View>
            <View className="flex-row items-center mt-3 gap-2">
              <Text className="text-2xl font-bold text-gray-900">{profile.full_name}</Text>
              {proProfile.is_verified && (
                <View className="w-6 h-6 bg-primary-600 rounded-full items-center justify-center">
                  <Ionicons name="checkmark" size={14} color="#ffffff" />
                </View>
              )}
            </View>
            <Rating
              rating={proProfile.avg_rating}
              showValue
              reviewCount={proProfile.total_reviews}
              className="mt-1"
            />
            <Text className="text-base text-gray-500 mt-1 text-center">
              {proProfile.headline ?? 'Professional'}
            </Text>
            <Badge
              variant={statusConfig.variant}
              label={statusConfig.label}
              className="mt-2"
            />
          </View>
        </View>

        {/* Stats Row */}
        <View className="mx-4 -mt-1 mb-3">
          <View
            className="bg-white rounded-2xl flex-row py-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View className="flex-1 items-center">
              <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center mb-2">
                <Ionicons name="briefcase-outline" size={18} color="#2563EB" />
              </View>
              <Text className="text-xl font-bold text-gray-900">
                {proProfile.total_jobs_completed}
              </Text>
              <Text className="text-xs text-gray-500">Jobs Done</Text>
            </View>
            <View className="w-px bg-gray-100" />
            <View className="flex-1 items-center">
              <View className="w-10 h-10 bg-amber-50 rounded-xl items-center justify-center mb-2">
                <Ionicons name="trophy-outline" size={18} color="#D97706" />
              </View>
              <Text className="text-xl font-bold text-gray-900">
                {proProfile.years_experience ?? 0}+
              </Text>
              <Text className="text-xs text-gray-500">Years Exp</Text>
            </View>
            <View className="w-px bg-gray-100" />
            <View className="flex-1 items-center">
              <View className="w-10 h-10 bg-green-50 rounded-xl items-center justify-center mb-2">
                <Ionicons name="flash-outline" size={18} color="#059669" />
              </View>
              <Text className="text-xl font-bold text-gray-900">
                {proProfile.response_time_minutes
                  ? `${proProfile.response_time_minutes}m`
                  : 'N/A'}
              </Text>
              <Text className="text-xs text-gray-500">Response</Text>
            </View>
          </View>
        </View>

        {/* Bio */}
        {proProfile.bio && (
          <View className="bg-white mx-4 rounded-2xl p-5 mb-3">
            <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              About
            </Text>
            <Text className="text-base text-gray-700 leading-6">{proProfile.bio}</Text>
          </View>
        )}

        {/* Pricing */}
        {(proProfile.hourly_rate_min != null || proProfile.hourly_rate_max != null) && (
          <View className="bg-white mx-4 rounded-2xl p-5 mb-3">
            <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Pricing
            </Text>
            <View className="flex-row items-center bg-secondary-50 rounded-xl p-4">
              <View className="w-10 h-10 bg-secondary-100 rounded-xl items-center justify-center mr-3">
                <Ionicons name="cash-outline" size={20} color="#059669" />
              </View>
              <View>
                <Text className="text-2xl font-bold text-secondary-600">
                  ${proProfile.hourly_rate_min ?? '?'} - ${proProfile.hourly_rate_max ?? '?'}
                </Text>
                <Text className="text-sm text-secondary-700">per hour</Text>
              </View>
            </View>
          </View>
        )}

        {/* Gallery */}
        <View className="bg-white mx-4 rounded-2xl p-5 mb-3">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Gallery
            </Text>
            {galleryImages.length > 6 && (
              <TouchableOpacity
                onPress={() => router.push('/pro/gallery')}
                className="flex-row items-center"
              >
                <Text className="text-primary-600 text-sm font-semibold mr-1">See All</Text>
                <Ionicons name="chevron-forward" size={16} color="#2563EB" />
              </TouchableOpacity>
            )}
          </View>
          {galleryImages.length > 0 ? (
            <ImageGallery
              images={galleryImages.slice(0, 6)}
              columns={3}
              onImagePress={() => router.push('/pro/gallery')}
            />
          ) : (
            <View className="items-center py-8 bg-gray-50 rounded-xl">
              <Ionicons name="images-outline" size={28} color="#D1D5DB" />
              <Text className="text-sm text-gray-400 mt-2">No gallery photos yet</Text>
            </View>
          )}
        </View>

        {/* Reviews Preview */}
        <View className="bg-white mx-4 rounded-2xl p-5 mb-3">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Reviews
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/pro/reviews')}
              className="flex-row items-center"
            >
              <Text className="text-primary-600 text-sm font-semibold mr-1">
                See All ({proProfile.total_reviews})
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#2563EB" />
            </TouchableOpacity>
          </View>
          <View className="bg-gray-50 rounded-xl p-4 items-center">
            <Rating rating={proProfile.avg_rating} size="lg" showValue className="mb-2" />
            <Text className="text-sm text-gray-500">
              Based on {proProfile.total_reviews} review{proProfile.total_reviews !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        <View className="h-28" />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex-row gap-3"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onPress={() => router.push('/(tabs)/messages')}
          leftIcon={<Ionicons name="chatbubble-outline" size={18} color="#374151" />}
        >
          Message
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          onPress={() => router.push('/job/post/category')}
          leftIcon={<Ionicons name="briefcase-outline" size={18} color="#ffffff" />}
        >
          Hire Pro
        </Button>
      </View>
    </View>
  );
}
