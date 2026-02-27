import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@renonext/shared/api/supabase';
import { createJob } from '@renonext/shared/api/jobs';
import { Button } from '@renonext/ui/Button';
import { Badge } from '@renonext/ui/Badge';

function ReviewSection({
  icon,
  title,
  onEdit,
  children,
}: {
  icon: string;
  title: string;
  onEdit?: () => void;
  children: React.ReactNode;
}) {
  return (
    <View
      className="bg-white rounded-2xl p-4 mb-3"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 1,
      }}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center mr-2.5">
            <Ionicons name={icon as any} size={16} color="#6B7280" />
          </View>
          <Text className="text-sm font-semibold text-gray-900">{title}</Text>
        </View>
        {onEdit && (
          <TouchableOpacity
            onPress={onEdit}
            className="flex-row items-center px-3 py-1.5 bg-gray-50 rounded-lg"
          >
            <Ionicons name="pencil-outline" size={14} color="#2563EB" />
            <Text className="text-xs font-medium text-primary-600 ml-1">Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
}

export default function ReviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isPosting, setIsPosting] = useState(false);

  const photos: string[] = params.photos ? JSON.parse(params.photos as string) : [];
  const isUrgent = params.isUrgent === '1';
  const hasBudget = Boolean(params.budgetMin || params.budgetMax);

  const handlePost = async () => {
    setIsPosting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const job = await createJob({
        client_id: user.id,
        category_id: params.categoryId as string,
        title: params.title as string,
        description: params.description as string,
        address: params.address as string,
        city: params.city as string,
        province: 'ON',
        postal_code: params.postalCode as string,
        latitude: 43.6532,
        longitude: -79.3832,
        scheduled_date: (params.scheduledDate as string) || null,
        scheduled_time_start: null,
        scheduled_time_end: null,
        is_flexible_date: params.isFlexibleDate === '1',
        is_urgent: isUrgent,
        estimated_hours: null,
        budget_min: params.budgetMin ? parseFloat(params.budgetMin as string) : null,
        budget_max: params.budgetMax ? parseFloat(params.budgetMax as string) : null,
        details: {},
        photos,
      });

      Alert.alert('Job Posted!', 'Your job has been posted. Pros will start bidding soon.', [
        { text: 'View Job', onPress: () => router.replace(`/job/${job.id}`) },
      ]);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to post job';
      Alert.alert('Error', msg);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900">Review & Post</Text>
          <Text className="text-base text-gray-500 mt-1">
            Make sure everything looks good before posting
          </Text>
        </View>

        {/* Job Title & Category */}
        <ReviewSection
          icon="briefcase-outline"
          title="Job Details"
          onEdit={() => router.push('/job/post/details')}
        >
          <Text className="text-lg font-bold text-gray-900 mb-1">
            {params.title as string}
          </Text>
          <View className="flex-row items-center gap-2 mb-2">
            <Badge variant="info" label={params.categoryName as string} size="sm" />
            {isUrgent && <Badge variant="error" label="Urgent" size="sm" />}
            {params.isFlexibleDate === '1' && (
              <Badge variant="neutral" label="Flexible Date" size="sm" />
            )}
          </View>
          <Text className="text-sm text-gray-600 leading-5">
            {params.description as string}
          </Text>
        </ReviewSection>

        {/* Location */}
        <ReviewSection
          icon="location-outline"
          title="Location"
          onEdit={() => router.push('/job/post/details')}
        >
          <Text className="text-sm text-gray-700 font-medium">
            {params.address}, {params.city}, ON {params.postalCode}
          </Text>
          <TouchableOpacity className="mt-3 h-28 bg-gray-50 rounded-xl items-center justify-center overflow-hidden">
            <Ionicons name="map-outline" size={28} color="#9CA3AF" />
            <Text className="text-xs text-gray-400 mt-1">Location Preview</Text>
          </TouchableOpacity>
        </ReviewSection>

        {/* Schedule */}
        <ReviewSection icon="calendar-outline" title="Schedule">
          <View className="flex-row items-center">
            <Ionicons
              name={params.scheduledDate ? 'calendar' : 'calendar-outline'}
              size={18}
              color={params.scheduledDate ? '#2563EB' : '#9CA3AF'}
            />
            <Text className="text-sm text-gray-700 ml-2">
              {params.scheduledDate
                ? `Preferred: ${params.scheduledDate}`
                : 'No specific date set'}
            </Text>
          </View>
        </ReviewSection>

        {/* Budget */}
        {hasBudget && (
          <ReviewSection icon="cash-outline" title="Budget">
            <View className="flex-row items-baseline">
              <Text className="text-2xl font-bold text-secondary-600">
                ${params.budgetMin || '0'}
              </Text>
              <Text className="text-gray-400 mx-2">-</Text>
              <Text className="text-2xl font-bold text-secondary-600">
                ${params.budgetMax || '?'}
              </Text>
            </View>
          </ReviewSection>
        )}

        {/* Materials */}
        <ReviewSection
          icon="construct-outline"
          title="Materials"
          onEdit={() => router.back()}
        >
          <View className="flex-row items-center">
            <Ionicons
              name={params.handleMaterials === 'self' ? 'person-outline' : 'cube-outline'}
              size={18}
              color="#6B7280"
            />
            <Text className="text-sm text-gray-700 ml-2">
              {params.handleMaterials === 'self'
                ? "I'll handle materials myself"
                : 'Material estimates included in posting'}
            </Text>
          </View>
        </ReviewSection>

        {/* Photos */}
        {photos.length > 0 && (
          <ReviewSection icon="images-outline" title={`Photos (${photos.length})`}>
            <View className="flex-row flex-wrap gap-2">
              {photos.map((uri, i) => (
                <View
                  key={i}
                  className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100"
                >
                  <Image
                    source={{ uri }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              ))}
            </View>
          </ReviewSection>
        )}

        {/* Cost Estimate */}
        <View
          className="bg-primary-600 rounded-2xl p-5 mb-6"
          style={{
            shadowColor: '#2563EB',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <View className="flex-row items-center mb-2">
            <Ionicons name="sparkles" size={20} color="#ffffff" />
            <Text className="text-base font-semibold text-white ml-2">
              What happens next?
            </Text>
          </View>
          <Text className="text-sm text-blue-100 leading-5">
            Once posted, local pros will review your job and submit bids. You can compare offers
            and choose the best fit for your project.
          </Text>
        </View>

        {/* Post Button */}
        <Button
          variant="primary"
          size="lg"
          loading={isPosting}
          onPress={handlePost}
          leftIcon={<Ionicons name="rocket-outline" size={20} color="#ffffff" />}
        >
          Post Job
        </Button>

        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center py-4"
        >
          <Text className="text-sm text-gray-500">Go back and make changes</Text>
        </TouchableOpacity>

        <View className="h-4" />
      </ScrollView>
    </SafeAreaView>
  );
}
