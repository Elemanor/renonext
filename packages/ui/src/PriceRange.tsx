import React from 'react';
import { View, Text } from 'react-native';

export type PriceRangeSize = 'sm' | 'md' | 'lg';

export interface PriceRangeProps {
  min: number;
  max: number;
  currency?: string;
  size?: PriceRangeSize;
  suggested?: boolean;
  className?: string;
}

const valueSizeStyles: Record<PriceRangeSize, string> = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
};

const labelSizeStyles: Record<PriceRangeSize, string> = {
  sm: 'text-xs',
  md: 'text-xs',
  lg: 'text-sm',
};

function formatPrice(value: number, currency: string): string {
  if (currency === '$' || currency === 'USD' || currency === 'CAD') {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
  return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function PriceRange({
  min,
  max,
  currency = '$',
  size = 'md',
  suggested = false,
  className = '',
}: PriceRangeProps): React.JSX.Element {
  const formattedMin = formatPrice(min, currency);
  const formattedMax = formatPrice(max, currency);

  return (
    <View className={`${className}`.trim()}>
      {suggested ? (
        <Text className={`text-gray-400 font-medium mb-0.5 ${labelSizeStyles[size]}`.trim()}>
          Suggested range
        </Text>
      ) : null}
      <View className="flex-row items-baseline">
        <Text className={`font-bold text-gray-900 ${valueSizeStyles[size]}`.trim()}>
          {formattedMin}
        </Text>
        <Text className={`font-medium text-gray-400 mx-1.5 ${labelSizeStyles[size]}`.trim()}>
          —
        </Text>
        <Text className={`font-bold text-gray-900 ${valueSizeStyles[size]}`.trim()}>
          {formattedMax}
        </Text>
      </View>
    </View>
  );
}
