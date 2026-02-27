import React, { useCallback } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  type ListRenderItemInfo,
} from 'react-native';

export interface GalleryImage {
  url: string;
  thumbnailUrl?: string;
  caption?: string;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3;
  onImagePress?: (index: number) => void;
  showCaptions?: boolean;
  className?: string;
}

export function ImageGallery({
  images,
  columns = 3,
  onImagePress,
  showCaptions = false,
  className = '',
}: ImageGalleryProps): React.JSX.Element {
  const gap = 8;

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<GalleryImage>) => {
      const imageSource = item.thumbnailUrl ?? item.url;

      return (
        <Pressable
          className="rounded-lg overflow-hidden flex-1 m-1"
          onPress={() => onImagePress?.(index)}
          style={{ maxWidth: `${100 / columns}%` }}
        >
          <Image
            source={{ uri: imageSource }}
            className="w-full aspect-square"
            resizeMode="cover"
          />
          {showCaptions && item.caption ? (
            <View className="bg-black/50 px-2 py-1 absolute bottom-0 left-0 right-0">
              <Text className="text-white text-xs" numberOfLines={1}>
                {item.caption}
              </Text>
            </View>
          ) : null}
        </Pressable>
      );
    },
    [columns, onImagePress, showCaptions],
  );

  const keyExtractor = useCallback(
    (item: GalleryImage, index: number) => `${item.url}-${index}`,
    [],
  );

  return (
    <View className={className}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={columns}
        scrollEnabled={false}
        contentContainerStyle={{ gap: gap / 2 }}
        columnWrapperStyle={{ gap: gap / 2 }}
      />
    </View>
  );
}
