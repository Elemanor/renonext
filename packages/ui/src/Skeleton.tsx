import React, { useEffect, useRef } from 'react';
import { View, Animated, type ViewStyle } from 'react-native';

export type SkeletonVariant = 'text' | 'circle' | 'card' | 'image';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  variant?: SkeletonVariant;
  className?: string;
}

const variantDefaults: Record<SkeletonVariant, { width: number | string; height: number | string; borderRadius: number }> = {
  text: { width: '100%', height: 16, borderRadius: 4 },
  circle: { width: 48, height: 48, borderRadius: 9999 },
  card: { width: '100%', height: 120, borderRadius: 12 },
  image: { width: '100%', height: 200, borderRadius: 8 },
};

export function Skeleton({
  width,
  height,
  borderRadius,
  variant = 'text',
  className = '',
}: SkeletonProps): React.JSX.Element {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [shimmerAnim]);

  const defaults = variantDefaults[variant];
  const resolvedWidth = width ?? defaults.width;
  const resolvedHeight = height ?? defaults.height;
  const resolvedRadius = borderRadius ?? defaults.borderRadius;

  const backgroundColor = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E7EB', '#F3F4F6'],
  });

  const animatedStyle: Animated.AnimatedProps<ViewStyle> = {
    width: resolvedWidth as number,
    height: resolvedHeight as number,
    borderRadius: resolvedRadius,
    backgroundColor,
  };

  return (
    <View className={className}>
      <Animated.View style={animatedStyle} />
    </View>
  );
}
