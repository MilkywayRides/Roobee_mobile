import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({ 
  onPress, 
  children, 
  variant = 'default', 
  size = 'default', 
  disabled = false,
  style 
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, styles[`${variant}Text`], disabled && styles.disabledText]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontWeight: '500',
  },
  default: {
    backgroundColor: '#09090b',
    borderWidth: 1,
    borderColor: '#09090b',
  },
  destructive: {
    backgroundColor: '#ef4444',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  secondary: {
    backgroundColor: '#f4f4f5',
    borderWidth: 1,
    borderColor: '#f4f4f5',
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  link: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  default: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  lg: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  icon: {
    width: 40,
    height: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  defaultText: {
    color: '#fafafa',
  },
  destructiveText: {
    color: '#fafafa',
  },
  outlineText: {
    color: '#09090b',
  },
  secondaryText: {
    color: '#09090b',
  },
  ghostText: {
    color: '#09090b',
  },
  linkText: {
    color: '#09090b',
    textDecorationLine: 'underline',
  },
  disabledText: {
    opacity: 0.5,
  },
});
