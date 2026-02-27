import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { supabase } from '@renonext/shared/api/supabase';
import { Button } from '@renonext/ui/Button';

// MapView conditionally imported (not available in Expo Go web)
let MapView: any;
let Marker: any;
try {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
} catch {
  MapView = null;
  Marker = null;
}

interface MapPin {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  type: 'pro' | 'job';
}

const DEFAULT_REGION = {
  latitude: 43.6532,
  longitude: -79.3832,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const PIN_COLORS = {
  pro: '#2563EB',
  job: '#F59E0B',
};

export default function MapScreen() {
  const router = useRouter();
  const [pins, setPins] = useState<MapPin[]>([]);
  const [region, setRegion] = useState(DEFAULT_REGION);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(
    null
  );
  const [showFilter, setShowFilter] = useState<'all' | 'pro' | 'job'>('all');
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
        setRegion({
          ...DEFAULT_REGION,
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      }
    };
    getLocation();
  }, []);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        // Fetch available pros
        const { data: pros } = await supabase
          .from('pro_profiles')
          .select('user_id, latitude, longitude, headline, profile:profiles(full_name)')
          .eq('is_available', true)
          .not('latitude', 'is', null);

        const proPins: MapPin[] = (pros ?? []).map((p: any) => ({
          id: p.user_id,
          latitude: p.latitude,
          longitude: p.longitude,
          title: p.profile?.full_name ?? 'Pro',
          description: p.headline ?? 'Available',
          type: 'pro',
        }));

        // Fetch active jobs
        const { data: jobs } = await supabase
          .from('jobs')
          .select('id, latitude, longitude, title, city')
          .in('status', ['posted', 'bidding']);

        const jobPins: MapPin[] = (jobs ?? []).map((j: any) => ({
          id: j.id,
          latitude: j.latitude,
          longitude: j.longitude,
          title: j.title,
          description: j.city,
          type: 'job',
        }));

        setPins([...proPins, ...jobPins]);
      } catch {
        // Handle error
      }
    };
    fetchPins();
  }, []);

  const filteredPins = showFilter === 'all' ? pins : pins.filter((p) => p.type === showFilter);

  const proCount = pins.filter((p) => p.type === 'pro').length;
  const jobCount = pins.filter((p) => p.type === 'job').length;

  const handleSearchArea = () => {
    // Re-fetch pins for the current visible region
  };

  const handleCenterOnUser = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        ...DEFAULT_REGION,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  if (!MapView) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-6">
        <View
          className="w-24 h-24 bg-primary-50 rounded-3xl items-center justify-center mb-4"
          style={{
            shadowColor: '#2563EB',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Ionicons name="map-outline" size={48} color="#2563EB" />
        </View>
        <Text className="text-xl font-bold text-gray-900 mt-2">Map View</Text>
        <Text className="text-gray-500 text-center mt-2 leading-5">
          Map view requires a native build. Use the list view to find pros and jobs near you.
        </Text>
        <Button
          variant="primary"
          size="lg"
          className="mt-6 w-full"
          onPress={() => router.push('/(tabs)/search')}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="search-outline" size={18} color="#ffffff" />
            <Text className="text-white font-semibold text-base ml-2">Go to Search</Text>
          </View>
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {filteredPins.map((pin) => (
          <Marker
            key={`${pin.type}-${pin.id}`}
            coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
            title={pin.title}
            description={pin.description}
            pinColor={PIN_COLORS[pin.type]}
            onCalloutPress={() => {
              if (pin.type === 'pro') {
                router.push(`/pro/${pin.id}`);
              } else {
                router.push(`/job/${pin.id}`);
              }
            }}
          />
        ))}
      </MapView>

      {/* Top Controls */}
      <SafeAreaView className="absolute top-0 left-0 right-0 px-4 pt-3" edges={['top']}>
        {/* Search Area Button */}
        <View className="items-center mb-3">
          <TouchableOpacity
            onPress={handleSearchArea}
            className="bg-white rounded-2xl px-5 py-2.5 flex-row items-center"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 4,
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="refresh-outline" size={18} color="#2563EB" />
            <Text className="text-primary-600 font-semibold ml-2">Search this area</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Pills */}
        <View className="flex-row gap-2 justify-center">
          <TouchableOpacity
            onPress={() => setShowFilter('all')}
            className={`flex-row items-center px-4 py-2 rounded-xl ${
              showFilter === 'all' ? 'bg-gray-900' : 'bg-white'
            }`}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.08,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            <Text
              className={`text-sm font-semibold ${
                showFilter === 'all' ? 'text-white' : 'text-gray-700'
              }`}
            >
              All ({pins.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowFilter('pro')}
            className={`flex-row items-center px-4 py-2 rounded-xl ${
              showFilter === 'pro' ? 'bg-primary-600' : 'bg-white'
            }`}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.08,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            <View
              className={`w-2.5 h-2.5 rounded-full mr-1.5 ${
                showFilter === 'pro' ? 'bg-white' : 'bg-primary-600'
              }`}
            />
            <Text
              className={`text-sm font-semibold ${
                showFilter === 'pro' ? 'text-white' : 'text-gray-700'
              }`}
            >
              Pros ({proCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowFilter('job')}
            className={`flex-row items-center px-4 py-2 rounded-xl ${
              showFilter === 'job' ? 'bg-amber-500' : 'bg-white'
            }`}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.08,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            <View
              className={`w-2.5 h-2.5 rounded-full mr-1.5 ${
                showFilter === 'job' ? 'bg-white' : 'bg-amber-500'
              }`}
            />
            <Text
              className={`text-sm font-semibold ${
                showFilter === 'job' ? 'text-white' : 'text-gray-700'
              }`}
            >
              Jobs ({jobCount})
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Current Location Button */}
      <TouchableOpacity
        onPress={handleCenterOnUser}
        className="absolute right-4 bottom-28 bg-white rounded-2xl w-12 h-12 items-center justify-center"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 4,
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="navigate" size={22} color="#2563EB" />
      </TouchableOpacity>

      {/* Bottom Legend */}
      <SafeAreaView className="absolute bottom-0 left-0 right-0 px-4 pb-4" edges={['bottom']}>
        <View
          className="bg-white rounded-2xl p-4"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 4,
          }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-5">
              <View className="flex-row items-center">
                <View className="w-3.5 h-3.5 rounded-full bg-primary-600 mr-2" />
                <View>
                  <Text className="text-sm font-semibold text-gray-900">Pros</Text>
                  <Text className="text-xs text-gray-400">{proCount} available</Text>
                </View>
              </View>
              <View className="flex-row items-center">
                <View className="w-3.5 h-3.5 rounded-full bg-amber-500 mr-2" />
                <View>
                  <Text className="text-sm font-semibold text-gray-900">Jobs</Text>
                  <Text className="text-xs text-gray-400">{jobCount} posted</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/search')}
              className="bg-gray-50 rounded-xl px-3 py-2 flex-row items-center"
              activeOpacity={0.7}
            >
              <Ionicons name="list-outline" size={16} color="#6B7280" />
              <Text className="text-sm font-medium text-gray-600 ml-1">List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
