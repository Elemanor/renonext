import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { supabase } from '@renonext/shared/api/supabase';
import type { Session } from '@supabase/supabase-js';

import '../../global.css';

// Keep the splash screen visible while we fetch auth state
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

const HEADER_TINT = '#2563EB';

function useProtectedRoute(session: Session | null, isLoading: boolean) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [session, segments, isLoading, router]);
}

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  useProtectedRoute(session, isLoading);

  const onLayoutReady = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View
        className="flex-1 items-center justify-center bg-white"
        onLayout={onLayoutReady}
      >
        <ActivityIndicator size="large" color={HEADER_TINT} />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <View className="flex-1" onLayout={onLayoutReady}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              contentStyle: { backgroundColor: '#ffffff' },
              headerTintColor: HEADER_TINT,
              headerBackTitleVisible: false,
              headerShadowVisible: false,
              headerStyle: { backgroundColor: '#ffffff' },
              headerTitleStyle: {
                fontWeight: '600',
                fontSize: 17,
                color: '#111827',
              },
            }}
          >
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="pro/[id]"
              options={{ headerShown: true, title: 'Pro Profile' }}
            />
            <Stack.Screen
              name="pro/gallery"
              options={{ headerShown: true, title: 'Gallery' }}
            />
            <Stack.Screen
              name="pro/reviews"
              options={{ headerShown: true, title: 'Reviews' }}
            />
            <Stack.Screen
              name="job/[id]"
              options={{ headerShown: true, title: 'Job Details' }}
            />
            <Stack.Screen
              name="job/post"
              options={{ headerShown: false, animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name="job/bids"
              options={{ headerShown: true, title: 'Bids Received' }}
            />
            <Stack.Screen
              name="job/progress"
              options={{ headerShown: true, title: 'Job Progress' }}
            />
            <Stack.Screen
              name="job/complete"
              options={{ headerShown: true, title: 'Complete Job' }}
            />
            <Stack.Screen
              name="materials/list"
              options={{ headerShown: true, title: 'Materials' }}
            />
            <Stack.Screen
              name="materials/order"
              options={{ headerShown: true, title: 'Order Materials' }}
            />
            <Stack.Screen
              name="materials/tracking"
              options={{ headerShown: true, title: 'Track Order' }}
            />
            <Stack.Screen
              name="tools/browse"
              options={{ headerShown: true, title: 'Browse Tools' }}
            />
            <Stack.Screen
              name="tools/[id]"
              options={{ headerShown: true, title: 'Tool Details' }}
            />
            <Stack.Screen
              name="tools/rental"
              options={{ headerShown: true, title: 'My Rentals' }}
            />
            <Stack.Screen
              name="chat/[conversationId]"
              options={{
                headerShown: true,
                title: 'Chat',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen name="settings" options={{ headerShown: false }} />
            <Stack.Screen
              name="map"
              options={{ headerShown: true, title: 'Map' }}
            />
          </Stack>
        </View>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
