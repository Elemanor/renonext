import React from 'react';
import { View, Text, Pressable } from 'react-native';

export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps {
  rating: number;
  maxStars?: number;
  size?: RatingSize;
  showValue?: boolean;
  reviewCount?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

const starSizeStyles: Record<RatingSize, string> = {
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-3xl',
};

const valueSizeStyles: Record<RatingSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const countSizeStyles: Record<RatingSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function Rating({
  rating,
  maxStars = 5,
  size = 'md',
  showValue = false,
  reviewCount,
  interactive = false,
  onRatingChange,
  className = '',
}: RatingProps): React.JSX.Element {
  const clampedRating = Math.max(0, Math.min(rating, maxStars));

  const handleStarPress = (starIndex: number): void => {
    if (interactive && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  const stars: React.JSX.Element[] = [];

  for (let i = 0; i < maxStars; i++) {
    const isFilled = i < Math.round(clampedRating);
    const starChar = isFilled ? '\u2605' : '\u2606';
    const colorStyle = isFilled ? 'text-yellow-400' : 'text-gray-300';

    const starElement = (
      <Text
        key={i}
        className={`${starSizeStyles[size]} ${colorStyle}`.trim()}
      >
        {starChar}
      </Text>
    );

    if (interactive) {
      stars.push(
        <Pressable key={i} onPress={() => handleStarPress(i)} hitSlop={4}>
          {starElement}
        </Pressable>
      );
    } else {
      stars.push(starElement);
    }
  }

  return (
    <View className={`flex-row items-center ${className}`.trim()}>
      <View className="flex-row">{stars}</View>

      {showValue ? (
        <Text className={`ml-1 font-semibold text-gray-700 ${valueSizeStyles[size]}`.trim()}>
          {clampedRating.toFixed(1)}
        </Text>
      ) : null}

      {reviewCount !== undefined ? (
        <Text className={`ml-1 text-gray-500 ${countSizeStyles[size]}`.trim()}>
          ({reviewCount})
        </Text>
      ) : null}
    </View>
  );
}
