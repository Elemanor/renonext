import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  Switch,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { signUp } from '@renonext/shared/api/auth';
import { Button } from '@renonext/ui/Button';
import { Input } from '@renonext/ui/Input';

const CATEGORIES = [
  { id: 'plumbing', name: 'Plumbing', icon: 'water-outline' },
  { id: 'electrical', name: 'Electrical', icon: 'flash-outline' },
  { id: 'carpentry', name: 'Carpentry', icon: 'hammer-outline' },
  { id: 'painting', name: 'Painting', icon: 'color-palette-outline' },
  { id: 'hvac', name: 'HVAC', icon: 'thermometer-outline' },
  { id: 'landscaping', name: 'Landscaping', icon: 'leaf-outline' },
  { id: 'cleaning', name: 'Cleaning', icon: 'sparkles-outline' },
  { id: 'roofing', name: 'Roofing', icon: 'home-outline' },
  { id: 'flooring', name: 'Flooring', icon: 'grid-outline' },
  { id: 'general', name: 'General Handyman', icon: 'construct-outline' },
];

const STEPS = [
  { label: 'Account', icon: 'person' },
  { label: 'Professional', icon: 'briefcase' },
  { label: 'Portfolio', icon: 'images' },
];

const proRegisterSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    hourlyRateMin: z.string().min(1, 'Please enter minimum rate'),
    hourlyRateMax: z.string().min(1, 'Please enter maximum rate'),
    bio: z.string().min(20, 'Bio must be at least 20 characters'),
    address: z.string().min(5, 'Please enter your service area address'),
    acceptTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.acceptTerms, {
    message: 'You must accept the terms and conditions',
    path: ['acceptTerms'],
  });

type ProRegisterForm = z.infer<typeof proRegisterSchema>;

export default function RegisterProScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProRegisterForm>({
    resolver: zodResolver(proRegisterSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      hourlyRateMin: '',
      hourlyRateMax: '',
      bio: '',
      address: '',
      acceptTerms: false,
    },
  });

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: 10 - galleryPhotos.length,
    });

    if (!result.canceled) {
      setGalleryPhotos((prev) => [...prev, ...result.assets.map((a) => a.uri)]);
    }
  };

  const removePhoto = (index: number) => {
    setGalleryPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProRegisterForm) => {
    if (selectedCategories.length === 0) {
      Alert.alert('Error', 'Please select at least one service category');
      return;
    }
    if (galleryPhotos.length < 3) {
      Alert.alert('Error', 'Please upload at least 3 gallery photos');
      return;
    }

    setIsLoading(true);
    try {
      await signUp(data.email, data.password, data.fullName, 'pro');
      Alert.alert(
        'Registration Submitted',
        'Your pro account is being reviewed. Please check your email to verify your account.',
        [{ text: 'OK', onPress: () => router.replace('/(auth)/login') }]
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      Alert.alert('Registration Failed', message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Fixed Header */}
        <View className="px-6 pt-4 pb-4 border-b border-gray-100">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
            >
              <Ionicons name="arrow-back" size={20} color="#111827" />
            </TouchableOpacity>
            <View className="flex-1 ml-3">
              <Text className="text-xl font-bold text-gray-900">Become a Pro</Text>
              <Text className="text-xs text-gray-500">Create your professional account</Text>
            </View>
          </View>

          {/* Step Indicator */}
          <View className="flex-row items-center">
            {STEPS.map((step, index) => (
              <React.Fragment key={step.label}>
                <TouchableOpacity
                  onPress={() => setCurrentStep(index)}
                  className="flex-row items-center"
                >
                  <View
                    className={`w-8 h-8 rounded-full items-center justify-center ${
                      index <= currentStep
                        ? 'bg-primary-600'
                        : 'bg-gray-200'
                    }`}
                  >
                    {index < currentStep ? (
                      <Ionicons name="checkmark" size={16} color="#ffffff" />
                    ) : (
                      <Ionicons
                        name={step.icon as any}
                        size={14}
                        color={index <= currentStep ? '#ffffff' : '#9CA3AF'}
                      />
                    )}
                  </View>
                  <Text
                    className={`text-xs font-medium ml-1.5 ${
                      index <= currentStep ? 'text-primary-600' : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </Text>
                </TouchableOpacity>
                {index < STEPS.length - 1 && (
                  <View
                    className={`flex-1 h-0.5 mx-2 rounded-full ${
                      index < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        <ScrollView
          ref={scrollRef}
          className="flex-1 px-6"
          contentContainerStyle={{ paddingVertical: 20 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Step 1: Account Information */}
          {currentStep === 0 && (
            <View>
              <Text className="text-lg font-bold text-gray-900 mb-1">
                Personal Information
              </Text>
              <Text className="text-sm text-gray-500 mb-5">
                Set up your account credentials
              </Text>

              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Full Name"
                    placeholder="John Smith"
                    autoCapitalize="words"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.fullName?.message}
                    leftIcon={<Ionicons name="person-outline" size={20} color="#9CA3AF" />}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Email"
                    placeholder="you@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                    leftIcon={<Ionicons name="mail-outline" size={20} color="#9CA3AF" />}
                  />
                )}
              />

              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Phone Number"
                    placeholder="(416) 555-0123"
                    keyboardType="phone-pad"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.phone?.message}
                    leftIcon={<Ionicons name="call-outline" size={20} color="#9CA3AF" />}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Password"
                    placeholder="At least 8 characters"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />}
                    rightIcon={
                      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                          name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                          size={20}
                          color="#9CA3AF"
                        />
                      </TouchableOpacity>
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.confirmPassword?.message}
                    leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />}
                  />
                )}
              />

              <Button
                variant="primary"
                size="lg"
                onPress={() => {
                  setCurrentStep(1);
                  scrollRef.current?.scrollTo({ y: 0, animated: true });
                }}
                className="mt-2"
              >
                Continue
              </Button>
            </View>
          )}

          {/* Step 2: Professional Details */}
          {currentStep === 1 && (
            <View>
              <Text className="text-lg font-bold text-gray-900 mb-1">
                Professional Details
              </Text>
              <Text className="text-sm text-gray-500 mb-5">
                Tell us about your skills and services
              </Text>

              {/* Categories Multi-Select */}
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Service Categories
              </Text>
              <View className="flex-row flex-wrap gap-2 mb-1">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategories.includes(cat.id);
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      onPress={() => toggleCategory(cat.id)}
                      className={`flex-row items-center px-3.5 py-2.5 rounded-xl border ${
                        isSelected
                          ? 'bg-primary-50 border-primary-300'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <Ionicons
                        name={cat.icon as any}
                        size={16}
                        color={isSelected ? '#2563EB' : '#9CA3AF'}
                      />
                      <Text
                        className={`text-sm font-medium ml-1.5 ${
                          isSelected ? 'text-primary-700' : 'text-gray-600'
                        }`}
                      >
                        {cat.name}
                      </Text>
                      {isSelected && (
                        <View className="ml-1.5">
                          <Ionicons name="checkmark-circle" size={16} color="#2563EB" />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
              {selectedCategories.length === 0 && (
                <Text className="text-xs text-red-500 mb-3">Select at least one category</Text>
              )}
              {selectedCategories.length > 0 && (
                <Text className="text-xs text-gray-400 mb-3">
                  {selectedCategories.length} selected
                </Text>
              )}

              {/* Hourly Rate */}
              <Text className="text-sm font-semibold text-gray-700 mb-2 mt-2">
                Hourly Rate Range
              </Text>
              <View className="flex-row gap-3 items-center">
                <View className="flex-1">
                  <Controller
                    control={control}
                    name="hourlyRateMin"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Min ($/hr)"
                        placeholder="30"
                        keyboardType="numeric"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.hourlyRateMin?.message}
                        leftIcon={<Text className="text-gray-400 font-medium">$</Text>}
                      />
                    )}
                  />
                </View>
                <View className="pt-3">
                  <Text className="text-gray-400 font-medium">to</Text>
                </View>
                <View className="flex-1">
                  <Controller
                    control={control}
                    name="hourlyRateMax"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Max ($/hr)"
                        placeholder="80"
                        keyboardType="numeric"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.hourlyRateMax?.message}
                        leftIcon={<Text className="text-gray-400 font-medium">$</Text>}
                      />
                    )}
                  />
                </View>
              </View>

              {/* Bio */}
              <Controller
                control={control}
                name="bio"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Bio / Headline"
                    placeholder="Tell clients about your experience and expertise..."
                    multiline
                    numberOfLines={4}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.bio?.message}
                    className="min-h-[100px]"
                  />
                )}
              />

              {/* Service Area */}
              <Controller
                control={control}
                name="address"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Service Area Address"
                    placeholder="123 Main St, Toronto, ON"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.address?.message}
                    leftIcon={<Ionicons name="location-outline" size={20} color="#9CA3AF" />}
                  />
                )}
              />

              {/* Service Radius Info */}
              <View className="flex-row items-center bg-primary-50 rounded-xl px-4 py-3 mb-4">
                <Ionicons name="navigate-outline" size={18} color="#2563EB" />
                <Text className="text-xs text-primary-700 ml-2 flex-1">
                  Your service radius will be set to 25 km from this address. You can adjust this later in settings.
                </Text>
              </View>

              <View className="flex-row gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onPress={() => {
                    setCurrentStep(0);
                    scrollRef.current?.scrollTo({ y: 0, animated: true });
                  }}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onPress={() => {
                    setCurrentStep(2);
                    scrollRef.current?.scrollTo({ y: 0, animated: true });
                  }}
                  className="flex-1"
                >
                  Continue
                </Button>
              </View>
            </View>
          )}

          {/* Step 3: Portfolio & Terms */}
          {currentStep === 2 && (
            <View>
              <Text className="text-lg font-bold text-gray-900 mb-1">
                Portfolio & Finish
              </Text>
              <Text className="text-sm text-gray-500 mb-5">
                Showcase your work and accept terms
              </Text>

              {/* Gallery Photos */}
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Gallery Photos
              </Text>
              <Text className="text-xs text-gray-400 mb-3">
                Upload at least 3 photos of your previous work (max 10)
              </Text>
              <View className="flex-row flex-wrap gap-2.5 mb-2">
                {galleryPhotos.map((uri, index) => (
                  <View
                    key={uri}
                    className="w-[30%] aspect-square rounded-xl overflow-hidden relative"
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.08,
                      shadowRadius: 4,
                      elevation: 2,
                    }}
                  >
                    <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
                    <TouchableOpacity
                      onPress={() => removePhoto(index)}
                      className="absolute top-1.5 right-1.5 bg-black/60 rounded-full w-6 h-6 items-center justify-center"
                    >
                      <Ionicons name="close" size={14} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                ))}
                {galleryPhotos.length < 10 && (
                  <TouchableOpacity
                    onPress={pickImage}
                    className="w-[30%] aspect-square rounded-xl border-2 border-dashed border-gray-300 items-center justify-center bg-gray-50"
                  >
                    <View className="items-center">
                      <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center mb-1.5">
                        <Ionicons name="camera-outline" size={22} color="#9CA3AF" />
                      </View>
                      <Text className="text-xs text-gray-400 font-medium">Add Photo</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>

              {/* Photo count indicator */}
              <View className="flex-row items-center mb-5">
                <View className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(100, (galleryPhotos.length / 3) * 100)}%`,
                      backgroundColor:
                        galleryPhotos.length >= 3 ? '#10B981' : '#F59E0B',
                    }}
                  />
                </View>
                <Text
                  className={`text-xs font-medium ml-2 ${
                    galleryPhotos.length >= 3 ? 'text-secondary-600' : 'text-accent-600'
                  }`}
                >
                  {galleryPhotos.length}/3 min
                </Text>
              </View>

              {/* Terms */}
              <Controller
                control={control}
                name="acceptTerms"
                render={({ field: { onChange, value } }) => (
                  <TouchableOpacity
                    onPress={() => onChange(!value)}
                    className={`flex-row items-center p-4 rounded-xl border mb-2 ${
                      value
                        ? 'bg-secondary-50 border-secondary-200'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <View
                      className={`w-6 h-6 rounded-md items-center justify-center border ${
                        value
                          ? 'bg-secondary-500 border-secondary-500'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {value && <Ionicons name="checkmark" size={16} color="#ffffff" />}
                    </View>
                    <Text className="text-sm text-gray-700 ml-3 flex-1">
                      I accept the{' '}
                      <Text className="text-primary-600 font-medium">Terms of Service</Text>
                      {' '}and{' '}
                      <Text className="text-primary-600 font-medium">Privacy Policy</Text>
                    </Text>
                  </TouchableOpacity>
                )}
              />
              {errors.acceptTerms && (
                <Text className="text-xs text-red-500 mb-2">{errors.acceptTerms.message}</Text>
              )}

              {/* Submit Buttons */}
              <View className="flex-row gap-3 mt-4">
                <Button
                  variant="outline"
                  size="lg"
                  onPress={() => {
                    setCurrentStep(1);
                    scrollRef.current?.scrollTo({ y: 0, animated: true });
                  }}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  loading={isLoading}
                  onPress={handleSubmit(onSubmit)}
                  className="flex-1"
                >
                  Create Account
                </Button>
              </View>

              <View className="h-8" />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
