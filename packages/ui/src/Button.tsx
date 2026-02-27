import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  type TouchableOpacityProps,
} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 active:bg-blue-700',
  secondary: 'bg-gray-200 active:bg-gray-300',
  outline: 'border border-gray-300 bg-transparent',
  destructive: 'bg-red-600 active:bg-red-700',
  ghost: 'bg-transparent',
  link: 'bg-transparent',
  success: 'bg-emerald-600 active:bg-emerald-700',
};

const variantTextStyles: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-gray-900',
  outline: 'text-gray-700',
  destructive: 'text-white',
  ghost: 'text-gray-900',
  link: 'text-blue-600',
  success: 'text-white',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5',
  md: 'px-4 py-2.5',
  lg: 'px-6 py-3.5',
};

const iconOnlySizeStyles: Record<ButtonSize, string> = {
  sm: 'p-1.5',
  md: 'p-2.5',
  lg: 'p-3.5',
};

const sizeTextStyles: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const spinnerSizes: Record<ButtonSize, 'small' | 'small' | 'large'> = {
  sm: 'small',
  md: 'small',
  lg: 'large',
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  children,
  className = '',
  leftIcon,
  rightIcon,
  ...rest
}: ButtonProps): React.JSX.Element {
  const isDisabled = disabled || loading;
  const isIconOnly = !children && (leftIcon || rightIcon);
  const isLink = variant === 'link';

  const baseStyle = 'flex-row items-center justify-center rounded-lg';
  const disabledStyle = isDisabled ? 'opacity-50' : '';
  const fullWidthStyle = fullWidth ? 'w-full' : '';
  const linkPaddingOverride = isLink ? 'px-0 py-0' : '';
  const paddingStyle = isIconOnly
    ? iconOnlySizeStyles[size]
    : (isLink ? '' : sizeStyles[size]);

  const containerClassName =
    `${baseStyle} ${variantStyles[variant]} ${paddingStyle} ${linkPaddingOverride} ${disabledStyle} ${fullWidthStyle} ${className}`.trim();

  const textClassName = `font-semibold ${variantTextStyles[variant]} ${sizeTextStyles[size]}${isLink ? ' underline' : ''}`.trim();

  const spinnerColor =
    variant === 'primary' || variant === 'destructive' || variant === 'success'
      ? '#ffffff'
      : variant === 'link'
        ? '#2563EB'
        : '#111827';

  return (
    <TouchableOpacity
      className={containerClassName}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size={spinnerSizes[size]}
          color={spinnerColor}
          className={children ? 'mr-2' : undefined}
        />
      ) : leftIcon ? (
        <View className={children ? 'mr-2' : undefined}>{leftIcon}</View>
      ) : null}

      {children != null ? (
        typeof children === 'string' ? (
          <Text className={textClassName}>{children}</Text>
        ) : (
          children
        )
      ) : null}

      {rightIcon && !loading ? (
        <View className={children ? 'ml-2' : undefined}>{rightIcon}</View>
      ) : null}
    </TouchableOpacity>
  );
}
