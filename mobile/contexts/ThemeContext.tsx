import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark';

interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

const lightTheme: ThemeColors = {
  background: '#ffffff',
  foreground: '#000000',
  card: '#ffffff',
  cardForeground: '#000000',
  popover: '#ffffff',
  popoverForeground: '#000000',
  primary: '#000000',
  primaryForeground: '#ffffff',
  secondary: '#f5f5f5',
  secondaryForeground: '#000000',
  muted: '#f5f5f5',
  mutedForeground: '#666666',
  accent: '#f5f5f5',
  accentForeground: '#000000',
  destructive: '#dc2626',
  destructiveForeground: '#ffffff',
  border: '#e5e5e5',
  input: '#e5e5e5',
  ring: '#000000',
};

const darkTheme: ThemeColors = {
  background: '#000000',
  foreground: '#ffffff',
  card: '#000000',
  cardForeground: '#ffffff',
  popover: '#000000',
  popoverForeground: '#ffffff',
  primary: '#ffffff',
  primaryForeground: '#000000',
  secondary: '#1a1a1a',
  secondaryForeground: '#ffffff',
  muted: '#1a1a1a',
  mutedForeground: '#999999',
  accent: '#1a1a1a',
  accentForeground: '#ffffff',
  destructive: '#dc2626',
  destructiveForeground: '#ffffff',
  border: '#1a1a1a',
  input: '#1a1a1a',
  ring: '#ffffff',
};

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.log('Failed to load theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.log('Failed to save theme:', error);
    }
  };

  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
