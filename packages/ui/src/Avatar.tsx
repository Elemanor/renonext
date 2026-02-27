import React from 'react';
import { View, Text, Image } from 'react-native';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  imageUrl?: string | null;
  name: string;
  size?: AvatarSize;
  className?: string;
}

const sizeMap: Record<AvatarSize, number> = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

const textSizeStyles: Record<AvatarSize, string> = {
  sm: 'text-xs',
  md: 'text-base',
  lg: 'text-xl',
  xl: 'text-3xl',
};

// Generate a consistent color from a name string
const avatarColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-teal-500',
  'bg-indigo-500',
  'bg-red-400',
];

function getColorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % avatarColors.length;
  return avatarColors[index];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function Avatar({
  imageUrl,
  name,
  size = 'md',
  className = '',
}: AvatarProps): React.JSX.Element {
  const dimension = sizeMap[size];

  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        className={`rounded-full ${sizeStyles[size]} ${className}`.trim()}
        style={{ width: dimension, height: dimension }}
        resizeMode="cover"
      />
    );
  }

  const bgColor = getColorForName(name);
  const initials = getInitials(name);

  return (
    <View
      className={`rounded-full items-center justify-center ${bgColor} ${sizeStyles[size]} ${className}`.trim()}
      style={{ width: dimension, height: dimension }}
    >
      <Text className={`font-semibold text-white ${textSizeStyles[size]}`.trim()}>
        {initials}
      </Text>
    </View>
  );
}
