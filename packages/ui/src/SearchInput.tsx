import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

export interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  onClear?: () => void;
  className?: string;
}

export function SearchInput({
  placeholder = 'Search...',
  value,
  onChangeText,
  onSubmit,
  onClear,
  className = '',
}: SearchInputProps): React.JSX.Element {
  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  return (
    <View
      className={`flex-row items-center bg-gray-50 rounded-full px-4 py-2.5 border border-gray-200 ${className}`.trim()}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      {/* Search icon */}
      <View className="mr-2.5">
        <Text className="text-gray-400 text-base">
          {'\u{1F50D}'}
        </Text>
      </View>

      {/* Input */}
      <TextInput
        className="flex-1 text-base text-gray-900"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Clear button */}
      {value.length > 0 ? (
        <TouchableOpacity
          onPress={handleClear}
          className="ml-2 w-5 h-5 rounded-full bg-gray-300 items-center justify-center"
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text className="text-white text-xs font-bold leading-none">
            {'\u00D7'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
