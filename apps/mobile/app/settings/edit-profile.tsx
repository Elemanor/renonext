import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@renonext/shared/api/supabase';
import { getProfile, updateProfile, getProProfile, updateProProfile } from '@renonext/shared/api/profiles';
import type { Profile, ProProfile } from '@renonext/shared';
import { Button } from '@renonext/ui/Button';
import { Input } from '@renonext/ui/Input';
import { Avatar } from '@renonext/ui/Avatar';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  bio: z.string().optional(),
  headline: z.string().optional(),
  address: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

interface FormSectionProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  children: React.ReactNode;
}

function FormSection({ icon, iconBg, iconColor, title, children }: FormSectionProps) {
  return (
    <View className="mb-5">
      <View className="flex-row items-center mb-3">
        <View className={`w-8 h-8 ${iconBg} rounded-lg items-center justify-center mr-2`}>
          <Ionicons name={icon as any} size={16} color={iconColor} />
        </View>
        <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {title}
        </Text>
      </View>
      <View
        className="bg-white rounded-2xl p-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 3,
          elevation: 1,
        }}
      >
        {children}
      </View>
    </View>
  );
}

export default function EditProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [proProfile, setProProfile] = useState<ProProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const p = await getProfile(user.id);
        setProfile(p);
        reset({
          fullName: p.full_name,
          phone: p.phone ?? '',
        });

        if (p.role === 'pro') {
          const pp = await getProProfile(user.id);
          setProProfile(pp);
          reset({
            fullName: p.full_name,
            phone: p.phone ?? '',
            bio: pp.bio ?? '',
            headline: pp.headline ?? '',
            address: pp.address ?? '',
          });
        }
      } catch {
        // Handle error
      }
    };
    fetchData();
  }, [reset]);

  const handlePickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && profile) {
      Alert.alert('Success', 'Avatar updated successfully.');
    }
  };

  const onSubmit = async (data: ProfileForm) => {
    if (!profile) return;
    setIsSaving(true);
    try {
      await updateProfile(profile.id, {
        full_name: data.fullName,
        phone: data.phone || null,
      });

      if (profile.role === 'pro' && proProfile) {
        await updateProProfile(profile.id, {
          bio: data.bio || null,
          headline: data.headline || null,
          address: data.address || null,
        });
      }

      Alert.alert('Saved', 'Your profile has been updated.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save';
      Alert.alert('Error', msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Edit Profile' }} />
      <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 16 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Avatar Section */}
            <View className="items-center mb-6">
              <TouchableOpacity onPress={handlePickAvatar} className="relative" activeOpacity={0.8}>
                <View
                  className="rounded-full"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 4,
                  }}
                >
                  <Avatar
                    name={profile?.full_name ?? 'User'}
                    imageUrl={profile?.avatar_url}
                    size="xl"
                  />
                </View>
                <View className="absolute bottom-0 right-0 bg-primary-600 rounded-full w-9 h-9 items-center justify-center border-3 border-white">
                  <Ionicons name="camera" size={16} color="#ffffff" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePickAvatar} className="mt-3">
                <Text className="text-sm text-primary-600 font-semibold">Change Photo</Text>
              </TouchableOpacity>
            </View>

            {/* Personal Information */}
            <FormSection
              icon="person-outline"
              iconBg="bg-blue-50"
              iconColor="#2563EB"
              title="Personal Information"
            >
              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Full Name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.fullName?.message}
                    leftIcon={<Ionicons name="person-outline" size={18} color="#9CA3AF" />}
                  />
                )}
              />

              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Phone"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="phone-pad"
                    leftIcon={<Ionicons name="call-outline" size={18} color="#9CA3AF" />}
                  />
                )}
              />
            </FormSection>

            {/* Pro-only Fields */}
            {profile?.role === 'pro' && (
              <>
                <FormSection
                  icon="briefcase-outline"
                  iconBg="bg-purple-50"
                  iconColor="#8B5CF6"
                  title="Professional Info"
                >
                  <Controller
                    control={control}
                    name="headline"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Headline"
                        placeholder="e.g. Licensed Plumber with 10+ years"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        leftIcon={<Ionicons name="ribbon-outline" size={18} color="#9CA3AF" />}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="bio"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <View>
                        <Input
                          label="Bio"
                          placeholder="Tell clients about your experience and specialties..."
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          multiline
                          numberOfLines={4}
                        />
                        <Text className="text-xs text-gray-400 mt-1 text-right">
                          {(value ?? '').length}/500
                        </Text>
                      </View>
                    )}
                  />
                </FormSection>

                <FormSection
                  icon="location-outline"
                  iconBg="bg-green-50"
                  iconColor="#059669"
                  title="Service Area"
                >
                  <Controller
                    control={control}
                    name="address"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Service Area Address"
                        placeholder="Where do you provide services?"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        leftIcon={<Ionicons name="navigate-outline" size={18} color="#9CA3AF" />}
                      />
                    )}
                  />
                </FormSection>
              </>
            )}

            {/* Save Button */}
            <View className="mt-2 mb-4">
              <Button
                variant="primary"
                size="lg"
                loading={isSaving}
                onPress={handleSubmit(onSubmit)}
              >
                <View className="flex-row items-center justify-center">
                  <Ionicons name="checkmark-circle-outline" size={20} color="#ffffff" />
                  <Text className="text-white font-semibold text-base ml-2">Save Changes</Text>
                </View>
              </Button>
              {isDirty && (
                <Text className="text-xs text-amber-500 text-center mt-2 font-medium">
                  You have unsaved changes
                </Text>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
