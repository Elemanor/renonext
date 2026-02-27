import React from 'react';
import { View, Text } from 'react-native';

export interface StatCardTrend {
  value: number;
  isPositive: boolean;
}

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: StatCardTrend;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon,
  trend,
  className = '',
}: StatCardProps): React.JSX.Element {
  const trendColor = trend?.isPositive ? 'text-emerald-600' : 'text-red-500';
  const trendArrow = trend?.isPositive ? '\u2191' : '\u2193';
  const trendSign = trend?.isPositive ? '+' : '';

  return (
    <View
      className={`bg-white rounded-xl p-4 border border-gray-100 ${className}`.trim()}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
      }}
    >
      {/* Header row with icon */}
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-sm text-gray-500 font-medium">{label}</Text>
        {icon ? (
          <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center">
            <Text className="text-base">{icon}</Text>
          </View>
        ) : null}
      </View>

      {/* Value */}
      <Text className="text-2xl font-bold text-gray-900">{value}</Text>

      {/* Trend */}
      {trend ? (
        <View className="flex-row items-center mt-1.5">
          <Text className={`text-sm font-medium ${trendColor}`.trim()}>
            {trendArrow} {trendSign}{trend.value}%
          </Text>
          <Text className="text-xs text-gray-400 ml-1.5">vs last period</Text>
        </View>
      ) : null}
    </View>
  );
}
