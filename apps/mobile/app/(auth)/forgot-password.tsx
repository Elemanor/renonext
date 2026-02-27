import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ionicons } from '@expo/vector-icons';
import { resetPassword } from '@renonext/shared/api/auth';
import { Button } from '@renonext/ui/Button';
import { Input } from '@renonext/ui/Input';

const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Success animation
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (emailSent) {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [emailSent, scaleAnim, fadeAnim]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotForm) => {
    setIsLoading(true);
    try {
      await resetPassword(data.email);
      setEmailSent(true);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to send reset email';
      Alert.alert('Error', message);
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
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ flexGrow: 1, paddingVertical: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mb-6"
          >
            <Ionicons name="arrow-back" size={20} color="#111827" />
          </TouchableOpacity>

          {emailSent ? (
            <View className="flex-1 justify-center items-center">
              <Animated.View
                style={{ transform: [{ scale: scaleAnim }] }}
                className="w-24 h-24 bg-secondary-50 rounded-full items-center justify-center mb-6"
              >
                <View className="w-16 h-16 bg-secondary-100 rounded-full items-center justify-center">
                  <Ionicons name="mail-open-outline" size={36} color="#059669" />
                </View>
              </Animated.View>

              <Animated.View style={{ opacity: fadeAnim }} className="items-center">
                <Text className="text-2xl font-bold text-gray-900 text-center mb-3">
                  Check Your Email
                </Text>
                <Text className="text-base text-gray-500 text-center mb-2 px-4 leading-6">
                  We've sent a password reset link to your email address.
                </Text>
                <Text className="text-sm text-gray-400 text-center mb-8 px-4">
                  Didn't receive it? Check your spam folder or try again.
                </Text>

                <Button
                  variant="primary"
                  size="lg"
                  onPress={() => router.replace('/(auth)/login')}
                  className="w-full mb-3"
                >
                  Back to Sign In
                </Button>

                <TouchableOpacity
                  onPress={() => setEmailSent(false)}
                  className="py-3"
                >
                  <Text className="text-primary-600 font-semibold text-sm">
                    Try a different email
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          ) : (
            <View className="flex-1 justify-center">
              {/* Icon */}
              <View className="items-center mb-6">
                <View className="w-20 h-20 bg-primary-50 rounded-full items-center justify-center">
                  <Ionicons name="lock-open-outline" size={36} color="#2563EB" />
                </View>
              </View>

              <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
                Forgot Password?
              </Text>
              <Text className="text-base text-gray-500 text-center mb-8 px-4 leading-6">
                No worries! Enter your email address and we'll send you a link to reset your
                password.
              </Text>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Email"
                    placeholder="you@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                    leftIcon={<Ionicons name="mail-outline" size={20} color="#9CA3AF" />}
                  />
                )}
              />

              <Button
                variant="primary"
                size="lg"
                loading={isLoading}
                onPress={handleSubmit(onSubmit)}
                className="mt-2"
              >
                Send Reset Link
              </Button>

              {/* Back to Sign In link */}
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex-row items-center justify-center mt-6"
              >
                <Ionicons name="arrow-back" size={16} color="#2563EB" />
                <Text className="text-primary-600 font-semibold text-sm ml-1">
                  Back to Sign In
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
