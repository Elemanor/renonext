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
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ionicons } from '@expo/vector-icons';
import { signIn, signInWithGoogle, signInWithApple } from '@renonext/shared/api/auth';
import { Button } from '@renonext/ui/Button';
import { Input } from '@renonext/ui/Input';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Fade-in animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      router.replace('/(tabs)');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Login failed';
      Alert.alert('Sign In Failed', message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Google sign in failed';
      Alert.alert('Error', message);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await signInWithApple();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Apple sign in failed';
      Alert.alert('Error', message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* Logo / App Name */}
            <View className="items-center mb-8">
              <View
                className="w-20 h-20 bg-primary-600 rounded-2xl items-center justify-center mb-4"
                style={{
                  shadowColor: '#2563EB',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 16,
                  elevation: 12,
                }}
              >
                <Ionicons name="construct" size={40} color="#ffffff" />
              </View>
              <Text className="text-3xl font-bold text-gray-900">RenoNext</Text>
              <Text className="text-base text-gray-500 mt-1">Find local pros you can trust</Text>
            </View>

            {/* Welcome Card */}
            <View
              className="bg-white rounded-3xl px-6 pt-8 pb-6"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 12,
                elevation: 4,
              }}
            >
              <Text className="text-2xl font-bold text-gray-900 mb-1">Welcome back</Text>
              <Text className="text-sm text-gray-500 mb-6">
                Sign in to your account to continue
              </Text>

              {/* Email Input */}
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

              {/* Password Input */}
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password"
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

              {/* Forgot Password */}
              <View className="items-end mb-6 -mt-2">
                <Link href="/(auth)/forgot-password" asChild>
                  <TouchableOpacity>
                    <Text className="text-primary-600 text-sm font-medium">Forgot Password?</Text>
                  </TouchableOpacity>
                </Link>
              </View>

              {/* Sign In Button */}
              <Button
                variant="primary"
                size="lg"
                loading={isLoading}
                onPress={handleSubmit(onSubmit)}
                className="mb-6"
              >
                Sign In
              </Button>

              {/* Divider */}
              <View className="flex-row items-center mb-6">
                <View className="flex-1 h-px bg-gray-200" />
                <Text className="mx-4 text-gray-400 text-xs font-medium uppercase tracking-wider">
                  or continue with
                </Text>
                <View className="flex-1 h-px bg-gray-200" />
              </View>

              {/* Social Buttons Row */}
              <View className="flex-row gap-3 mb-2">
                {/* Google Sign In */}
                <TouchableOpacity
                  onPress={handleGoogleSignIn}
                  className="flex-1 flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-3.5"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.04,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                >
                  <Ionicons name="logo-google" size={20} color="#4285F4" />
                  <Text className="text-gray-700 font-semibold ml-2 text-sm">Google</Text>
                </TouchableOpacity>

                {/* Apple Sign In */}
                {Platform.OS === 'ios' && (
                  <TouchableOpacity
                    onPress={handleAppleSignIn}
                    className="flex-1 flex-row items-center justify-center bg-gray-900 rounded-xl py-3.5"
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 2,
                    }}
                  >
                    <Ionicons name="logo-apple" size={20} color="#ffffff" />
                    <Text className="text-white font-semibold ml-2 text-sm">Apple</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Register Link */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-600">Don't have an account? </Text>
              <Link href="/(auth)/register" asChild>
                <TouchableOpacity>
                  <Text className="text-primary-600 font-bold">Register</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
