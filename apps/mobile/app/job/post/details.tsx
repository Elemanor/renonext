import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '@renonext/ui/Button';
import { Input } from '@renonext/ui/Input';

const detailsSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Please provide more details (at least 20 characters)'),
  address: z.string().min(5, 'Please enter the job address'),
  city: z.string().min(2, 'Please enter the city'),
  postalCode: z.string().min(3, 'Please enter postal code'),
  scheduledDate: z.string().optional(),
  isUrgent: z.boolean(),
  isFlexibleDate: z.boolean(),
  budgetMin: z.string().optional(),
  budgetMax: z.string().optional(),
});

type DetailsForm = z.infer<typeof detailsSchema>;

function SectionHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <View className="flex-row items-center mb-4 mt-6">
      <View className="w-9 h-9 bg-primary-50 rounded-xl items-center justify-center mr-3">
        <Ionicons name={icon as any} size={18} color="#2563EB" />
      </View>
      <View>
        <Text className="text-lg font-bold text-gray-900">{title}</Text>
        {subtitle && <Text className="text-xs text-gray-400 mt-0.5">{subtitle}</Text>}
      </View>
    </View>
  );
}

export default function JobDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ categoryId: string; categoryName: string }>();
  const [photos, setPhotos] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DetailsForm>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      title: '',
      description: '',
      address: '',
      city: '',
      postalCode: '',
      scheduledDate: '',
      isUrgent: false,
      isFlexibleDate: true,
      budgetMin: '',
      budgetMax: '',
    },
  });

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: 10 - photos.length,
    });
    if (!result.canceled) {
      setPhotos((prev) => [...prev, ...result.assets.map((a) => a.uri)]);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotos((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: DetailsForm) => {
    router.push({
      pathname: '/job/post/materials',
      params: {
        categoryId: params.categoryId,
        categoryName: params.categoryName,
        title: data.title,
        description: data.description,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        scheduledDate: data.scheduledDate ?? '',
        isUrgent: data.isUrgent ? '1' : '0',
        isFlexibleDate: data.isFlexibleDate ? '1' : '0',
        budgetMin: data.budgetMin ?? '',
        budgetMax: data.budgetMax ?? '',
        photos: JSON.stringify(photos),
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Category pill */}
          <View className="flex-row items-center mt-4 mb-2">
            <View className="bg-primary-50 px-3 py-1.5 rounded-full">
              <Text className="text-sm text-primary-600 font-semibold">
                {params.categoryName ?? 'Category'}
              </Text>
            </View>
          </View>

          {/* Job Info Section */}
          <SectionHeader icon="create-outline" title="Job Information" subtitle="What needs to be done?" />

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Job Title"
                placeholder="e.g., Fix leaking kitchen faucet"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.title?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Description"
                placeholder="Describe what you need done in detail..."
                multiline
                numberOfLines={5}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.description?.message}
              />
            )}
          />

          {/* Photos Section */}
          <SectionHeader icon="camera-outline" title="Photos" subtitle="Help pros understand the job" />

          {photos.length > 0 && (
            <View className="flex-row flex-wrap gap-2 mb-3">
              {photos.map((uri, index) => (
                <View key={uri} className="w-24 h-24 rounded-xl overflow-hidden relative">
                  <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
                  <TouchableOpacity
                    onPress={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-black/60 rounded-full w-6 h-6 items-center justify-center"
                  >
                    <Ionicons name="close" size={14} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {photos.length < 10 && (
            <View
              className="border-2 border-dashed border-gray-200 rounded-2xl p-6 items-center bg-white mb-2"
            >
              <View className="w-14 h-14 bg-gray-50 rounded-full items-center justify-center mb-3">
                <Ionicons name="images-outline" size={28} color="#9CA3AF" />
              </View>
              <Text className="text-sm font-medium text-gray-600 mb-1">
                Add photos of the job
              </Text>
              <Text className="text-xs text-gray-400 mb-4">
                {photos.length}/10 photos added
              </Text>
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={takePhoto}
                  className="flex-row items-center bg-gray-50 px-4 py-2.5 rounded-xl"
                >
                  <Ionicons name="camera-outline" size={18} color="#6B7280" />
                  <Text className="text-sm font-medium text-gray-700 ml-2">Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={pickImages}
                  className="flex-row items-center bg-primary-50 px-4 py-2.5 rounded-xl"
                >
                  <Ionicons name="image-outline" size={18} color="#2563EB" />
                  <Text className="text-sm font-medium text-primary-600 ml-2">Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Location Section */}
          <SectionHeader icon="location-outline" title="Location" subtitle="Where is the job?" />

          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Street Address"
                placeholder="123 Main St"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.address?.message}
                leftIcon={<Ionicons name="location-outline" size={20} color="#9CA3AF" />}
              />
            )}
          />
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="City"
                    placeholder="Toronto"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.city?.message}
                  />
                )}
              />
            </View>
            <View className="flex-1">
              <Controller
                control={control}
                name="postalCode"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Postal Code"
                    placeholder="M5V 1A1"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.postalCode?.message}
                  />
                )}
              />
            </View>
          </View>

          {/* Schedule Section */}
          <SectionHeader icon="calendar-outline" title="Schedule" subtitle="When should it be done?" />

          <Controller
            control={control}
            name="scheduledDate"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Preferred Date"
                placeholder="YYYY-MM-DD"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                leftIcon={<Ionicons name="calendar-outline" size={20} color="#9CA3AF" />}
              />
            )}
          />

          <Controller
            control={control}
            name="isFlexibleDate"
            render={({ field: { onChange, value } }) => (
              <View className="flex-row items-center justify-between bg-white rounded-xl px-4 py-3.5 mb-3">
                <View className="flex-row items-center flex-1">
                  <View className="w-8 h-8 bg-primary-50 rounded-lg items-center justify-center mr-3">
                    <Ionicons name="swap-horizontal-outline" size={16} color="#2563EB" />
                  </View>
                  <View>
                    <Text className="text-sm font-medium text-gray-900">Flexible on dates</Text>
                    <Text className="text-xs text-gray-400">I can adjust my schedule</Text>
                  </View>
                </View>
                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
                  thumbColor={value ? '#2563EB' : '#f4f3f4'}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="isUrgent"
            render={({ field: { onChange, value } }) => (
              <View
                className={`flex-row items-center justify-between rounded-xl px-4 py-3.5 mb-3 ${
                  value ? 'bg-red-50 border border-red-100' : 'bg-white'
                }`}
              >
                <View className="flex-row items-center flex-1">
                  <View className={`w-8 h-8 ${value ? 'bg-red-100' : 'bg-red-50'} rounded-lg items-center justify-center mr-3`}>
                    <Ionicons name="alert-circle" size={16} color="#EF4444" />
                  </View>
                  <View>
                    <Text className="text-sm font-medium text-gray-900">Urgent job</Text>
                    <Text className="text-xs text-gray-400">Needs immediate attention</Text>
                  </View>
                </View>
                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={value ? '#EF4444' : '#f4f3f4'}
                />
              </View>
            )}
          />

          {/* Budget Section */}
          <SectionHeader icon="cash-outline" title="Budget" subtitle="Optional - helps pros price their bid" />

          <View className="flex-row gap-3 mb-6">
            <View className="flex-1">
              <Controller
                control={control}
                name="budgetMin"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Minimum ($)"
                    placeholder="100"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    leftIcon={<Text className="text-gray-400 text-base">$</Text>}
                  />
                )}
              />
            </View>
            <View className="items-center justify-center pt-6">
              <Text className="text-gray-300 font-medium">to</Text>
            </View>
            <View className="flex-1">
              <Controller
                control={control}
                name="budgetMax"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Maximum ($)"
                    placeholder="500"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    leftIcon={<Text className="text-gray-400 text-base">$</Text>}
                  />
                )}
              />
            </View>
          </View>

          <Button variant="primary" size="lg" onPress={handleSubmit(onSubmit)}>
            Continue to Materials
          </Button>

          <View className="h-4" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
