import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';

export interface CardProps {
  variant?: CardVariant;
  pressable?: boolean;
  onPress?: () => void;
  className?: string;
  children: React.ReactNode;
}

export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export interface CardActionProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white rounded-xl shadow-sm border border-gray-100',
  elevated: 'bg-white rounded-xl border border-gray-50',
  outlined: 'bg-white rounded-xl border-2 border-gray-200',
  filled: 'bg-gray-50 rounded-xl',
};

const elevatedShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
};

export function Card({
  variant = 'default',
  pressable = false,
  onPress,
  className = '',
  children,
}: CardProps): React.JSX.Element {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const cardStyle = `${variantStyles[variant]} ${className}`.trim();
  const inlineStyle = variant === 'elevated' ? elevatedShadow : undefined;

  if (pressable || onPress) {
    return (
      <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, inlineStyle]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          className={cardStyle}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <View className={cardStyle} style={inlineStyle}>
      {children}
    </View>
  );
}

export function CardHeader({ title, subtitle, className = '' }: CardHeaderProps): React.JSX.Element {
  return (
    <View className={`px-4 pt-4 pb-2 ${className}`.trim()}>
      <Text className="text-lg font-semibold text-gray-900">{title}</Text>
      {subtitle ? (
        <Text className="text-sm text-gray-500 mt-0.5">{subtitle}</Text>
      ) : null}
    </View>
  );
}

export function CardContent({ className = '', children }: CardContentProps): React.JSX.Element {
  return (
    <View className={`px-4 py-2 ${className}`.trim()}>
      {children}
    </View>
  );
}

export function CardFooter({ className = '', children }: CardFooterProps): React.JSX.Element {
  return (
    <View className={`px-4 pt-2 pb-4 border-t border-gray-100 ${className}`.trim()}>
      {children}
    </View>
  );
}

const actionVariantStyles = {
  primary: 'text-blue-600',
  secondary: 'text-gray-600',
};

export function CardAction({
  label,
  onPress,
  variant = 'primary',
  className = '',
}: CardActionProps): React.JSX.Element {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`py-1 ${className}`.trim()}
      hitSlop={{ top: 4, bottom: 4, left: 8, right: 8 }}
    >
      <Text className={`text-sm font-semibold ${actionVariantStyles[variant]}`.trim()}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
