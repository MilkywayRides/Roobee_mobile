import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SessionProvider, useSession } from '@/lib/auth';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

const InitialLayout = () => {
  const { session, isLoading } = useSession();
  const segments = useSegments();
  const router = useRouter();
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [isLoadingOnboarding, setIsLoadingOnboarding] = useState(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      const completed = await AsyncStorage.getItem('onboardingCompleted');
      setOnboardingCompleted(completed === 'true');
      setIsLoadingOnboarding(false);
    };

    checkOnboarding();
  }, []);

  useEffect(() => {
    if (isLoading || isLoadingOnboarding) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!onboardingCompleted) {
      router.replace('/onboarding');
    } else if (!session && !inAuthGroup) {
      router.replace('/(auth)');
    } else if (session) {
      router.replace('/(tabs)');
    }
  }, [session, isLoading, onboardingCompleted, isLoadingOnboarding]);

  if (isLoading || isLoadingOnboarding) {
    return <View />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SessionProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <InitialLayout />
        <StatusBar style="auto" />
      </ThemeProvider>
    </SessionProvider>
  );
}