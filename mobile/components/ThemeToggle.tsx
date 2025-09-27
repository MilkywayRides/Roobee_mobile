import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, colors, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        padding: 8,
        borderRadius: 6,
        backgroundColor: colors.secondary,
      }}
    >
      <Ionicons
        name={theme === 'light' ? 'moon' : 'sunny'}
        size={20}
        color={colors.foreground}
      />
    </TouchableOpacity>
  );
}
