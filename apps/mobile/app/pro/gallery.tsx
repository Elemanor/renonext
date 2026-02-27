import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  Share,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import EmptyState from '../../components/EmptyState';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_GAP = 4;
const IMAGE_SIZE = (SCREEN_WIDTH - IMAGE_GAP * 4) / 3;

interface GalleryPhoto {
  url: string;
  caption?: string;
  tag?: 'before' | 'after';
}

export default function GalleryScreen() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [photos] = useState<GalleryPhoto[]>([]);

  const handleShare = async (photo: GalleryPhoto) => {
    try {
      await Share.share({
        url: photo.url,
        message: photo.caption ?? 'Check out this work!',
      });
    } catch {
      // Handle error
    }
  };

  const renderPhoto = ({ item, index }: { item: GalleryPhoto; index: number }) => (
    <TouchableOpacity
      onPress={() => setSelectedIndex(index)}
      activeOpacity={0.85}
      style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, margin: IMAGE_GAP / 2 }}
    >
      <Image
        source={{ uri: item.url }}
        className="w-full h-full rounded-lg"
        resizeMode="cover"
      />
      {item.tag && (
        <View
          className={`absolute top-2 left-2 px-2.5 py-1 rounded-md ${
            item.tag === 'before' ? 'bg-red-500' : 'bg-secondary-500'
          }`}
        >
          <Text className="text-white text-xs font-bold">
            {item.tag.toUpperCase()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center"
        >
          <Ionicons name="arrow-back" size={22} color="#374151" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">Gallery</Text>
        <View className="w-10" />
      </View>

      <FlatList
        data={photos}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        renderItem={renderPhoto}
        numColumns={3}
        contentContainerStyle={{ padding: IMAGE_GAP / 2 }}
        ListEmptyComponent={
          <EmptyState
            icon="images-outline"
            title="No Photos Yet"
            description="Gallery photos will appear here once uploaded by the pro."
          />
        }
      />

      {/* Full-Screen Viewer Modal */}
      <Modal visible={selectedIndex !== null} transparent animationType="fade">
        <View className="flex-1 bg-black">
          {/* Header */}
          <SafeAreaView className="flex-row justify-between items-center px-4 pt-2 pb-3">
            <TouchableOpacity
              onPress={() => setSelectedIndex(null)}
              className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
            >
              <Ionicons name="close" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text className="text-white text-base font-semibold">
              {selectedIndex !== null ? `${selectedIndex + 1} / ${photos.length}` : ''}
            </Text>
            {selectedIndex !== null && photos[selectedIndex] ? (
              <TouchableOpacity
                onPress={() => handleShare(photos[selectedIndex!])}
                className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
              >
                <Ionicons name="share-outline" size={22} color="#ffffff" />
              </TouchableOpacity>
            ) : (
              <View className="w-10" />
            )}
          </SafeAreaView>

          {/* Image */}
          {selectedIndex !== null && photos[selectedIndex] && (
            <View className="flex-1 justify-center items-center px-4">
              <Image
                source={{ uri: photos[selectedIndex].url }}
                className="w-full h-96"
                resizeMode="contain"
              />
              {photos[selectedIndex].tag && (
                <View
                  className={`mt-3 px-3 py-1.5 rounded-full ${
                    photos[selectedIndex].tag === 'before' ? 'bg-red-500/80' : 'bg-secondary-500/80'
                  }`}
                >
                  <Text className="text-white font-semibold text-sm">
                    {photos[selectedIndex].tag === 'before' ? 'Before' : 'After'}
                  </Text>
                </View>
              )}
              {photos[selectedIndex].caption && (
                <Text className="text-white/80 text-center mt-3 text-base px-6 leading-6">
                  {photos[selectedIndex].caption}
                </Text>
              )}
            </View>
          )}

          {/* Navigation */}
          <View className="flex-row justify-between px-6 pb-8">
            <TouchableOpacity
              onPress={() =>
                setSelectedIndex((prev) =>
                  prev !== null && prev > 0 ? prev - 1 : prev
                )
              }
              disabled={selectedIndex === 0}
              className={`w-12 h-12 rounded-full items-center justify-center ${
                selectedIndex === 0 ? 'bg-white/5' : 'bg-white/15'
              }`}
            >
              <Ionicons
                name="chevron-back"
                size={28}
                color={selectedIndex === 0 ? '#555' : '#fff'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setSelectedIndex((prev) =>
                  prev !== null && prev < photos.length - 1 ? prev + 1 : prev
                )
              }
              disabled={selectedIndex === photos.length - 1}
              className={`w-12 h-12 rounded-full items-center justify-center ${
                selectedIndex === photos.length - 1 ? 'bg-white/5' : 'bg-white/15'
              }`}
            >
              <Ionicons
                name="chevron-forward"
                size={28}
                color={selectedIndex === photos.length - 1 ? '#555' : '#fff'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
