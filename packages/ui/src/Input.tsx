import React from 'react';
import { View, Text, TextInput, type TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  ...rest
}: InputProps): React.JSX.Element {
  const borderStyle = error
    ? 'border-red-500 focus:border-red-500'
    : 'border-gray-300 focus:border-blue-500';

  const inputBaseStyle = 'flex-1 text-base text-gray-900 py-2.5';

  return (
    <View className={`mb-4 ${className}`.trim()}>
      {label ? (
        <Text className="text-sm font-medium text-gray-700 mb-1.5">{label}</Text>
      ) : null}

      <View
        className={`flex-row items-center border rounded-lg bg-white px-3 ${borderStyle}`.trim()}
      >
        {leftIcon ? (
          <View className="mr-2">{leftIcon}</View>
        ) : null}

        <TextInput
          className={inputBaseStyle}
          placeholderTextColor="#9CA3AF"
          {...rest}
        />

        {rightIcon ? (
          <View className="ml-2">{rightIcon}</View>
        ) : null}
      </View>

      {error ? (
        <Text className="text-sm text-red-500 mt-1">{error}</Text>
      ) : helperText ? (
        <Text className="text-sm text-gray-500 mt-1">{helperText}</Text>
      ) : null}
    </View>
  );
}
