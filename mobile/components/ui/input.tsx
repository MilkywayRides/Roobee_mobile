import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  variant?: 'default';
}

export function Input({ variant = 'default', style, ...props }: InputProps) {
  return (
    <TextInput
      style={[styles.base, styles[variant], style]}
      placeholderTextColor="#71717a"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  default: {
    backgroundColor: '#ffffff',
    borderColor: '#e4e4e7',
    color: '#09090b',
  },
});
