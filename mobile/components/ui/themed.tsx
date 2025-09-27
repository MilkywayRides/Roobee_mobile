import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemedViewProps {
  style?: ViewStyle;
  children: React.ReactNode;
  variant?: 'default' | 'card' | 'secondary' | 'muted';
}

export function ThemedView({ style, children, variant = 'default' }: ThemedViewProps) {
  const { colors } = useTheme();
  
  const getBackgroundColor = () => {
    switch (variant) {
      case 'card': return colors.card;
      case 'secondary': return colors.secondary;
      case 'muted': return colors.muted;
      default: return colors.background;
    }
  };

  return (
    <View style={[{ backgroundColor: getBackgroundColor() }, style]}>
      {children}
    </View>
  );
}

interface ThemedTextProps {
  style?: TextStyle;
  children: React.ReactNode;
  variant?: 'default' | 'muted' | 'destructive' | 'large' | 'small';
}

export function ThemedText({ style, children, variant = 'default' }: ThemedTextProps) {
  const { colors } = useTheme();
  
  const getTextStyle = () => {
    const baseStyle = { color: colors.foreground };
    
    switch (variant) {
      case 'muted':
        return { ...baseStyle, color: colors.mutedForeground };
      case 'destructive':
        return { ...baseStyle, color: colors.destructive };
      case 'large':
        return { ...baseStyle, fontSize: 24, fontWeight: '600' as const };
      case 'small':
        return { ...baseStyle, fontSize: 14, color: colors.mutedForeground };
      default:
        return baseStyle;
    }
  };

  return (
    <Text style={[getTextStyle(), style]}>
      {children}
    </Text>
  );
}

interface ThemedButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  style?: ViewStyle;
}

export function ThemedButton({ onPress, children, variant = 'default', style }: ThemedButtonProps) {
  const { colors } = useTheme();
  
  const getButtonStyle = () => {
    const baseStyle = {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center' as const,
    };
    
    switch (variant) {
      case 'destructive':
        return { ...baseStyle, backgroundColor: colors.destructive };
      case 'outline':
        return { ...baseStyle, borderWidth: 1, borderColor: colors.border };
      case 'secondary':
        return { ...baseStyle, backgroundColor: colors.secondary };
      case 'ghost':
        return { ...baseStyle, backgroundColor: 'transparent' };
      default:
        return { ...baseStyle, backgroundColor: colors.primary };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'destructive':
        return colors.destructiveForeground;
      case 'outline':
        return colors.foreground;
      case 'secondary':
        return colors.secondaryForeground;
      case 'ghost':
        return colors.foreground;
      default:
        return colors.primaryForeground;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={[getButtonStyle(), style]}>
      <Text style={{ color: getTextColor(), fontWeight: '500' }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

interface ThemedInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: ViewStyle;
}

export function ThemedInput({ value, onChangeText, placeholder, secureTextEntry, style }: ThemedInputProps) {
  const { colors } = useTheme();

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={colors.mutedForeground}
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.background,
          color: colors.foreground,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 6,
          fontSize: 16,
        },
        style,
      ]}
    />
  );
}

export function ThemedScrollView({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const { colors } = useTheme();
  
  return (
    <ScrollView style={[{ backgroundColor: colors.background }, style]}>
      {children}
    </ScrollView>
  );
}
