import React from 'react';
import { View, Text } from 'react-native';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  label: string;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-100',
  warning: 'bg-yellow-100',
  error: 'bg-red-100',
  info: 'bg-blue-100',
  neutral: 'bg-gray-100',
};

const variantTextStyles: Record<BadgeVariant, string> = {
  success: 'text-green-800',
  warning: 'text-yellow-800',
  error: 'text-red-800',
  info: 'text-blue-800',
  neutral: 'text-gray-800',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5',
  md: 'px-2.5 py-1',
};

const sizeTextStyles: Record<BadgeSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
};

export function Badge({
  variant = 'neutral',
  label,
  size = 'md',
  className = '',
}: BadgeProps): React.JSX.Element {
  return (
    <View
      className={`self-start rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim()}
    >
      <Text
        className={`font-medium ${variantTextStyles[variant]} ${sizeTextStyles[size]}`.trim()}
      >
        {label}
      </Text>
    </View>
  );
}
