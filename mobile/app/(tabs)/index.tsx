import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { AuthService, User } from '@/lib/auth';
import { ThemedView, ThemedText, ThemedButton, ThemedScrollView } from '@/components/ui/themed';
import { useTheme } from '@/contexts/ThemeContext';

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const { colors } = useTheme();

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await AuthService.getUser();
      setUser(currentUser);
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AuthService.logout();
            router.replace('/(auth)/sign-in');
          },
        },
      ]
    );
  };

  return (
    <ThemedScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText variant="large">Welcome</ThemedText>
      </ThemedView>

      {user && (
        <ThemedView variant="card" style={styles.userCard}>
          <ThemedText style={styles.greeting}>
            Hello, {user.name || user.email}!
          </ThemedText>
          <ThemedText variant="muted">
            Role: {user.role}
          </ThemedText>
        </ThemedView>
      )}

      <ThemedView variant="card" style={styles.actionsCard}>
        <ThemedText style={styles.cardTitle}>Quick Actions</ThemedText>
        
        <ThemedButton
          onPress={() => router.push('/(tabs)/profile')}
          style={styles.actionButton}
        >
          View Profile
        </ThemedButton>
        
        <ThemedButton
          variant="secondary"
          onPress={() => router.push('/(tabs)/settings')}
          style={styles.actionButton}
        >
          Settings
        </ThemedButton>
        
        <ThemedButton
          variant="destructive"
          onPress={handleLogout}
          style={styles.actionButton}
        >
          Logout
        </ThemedButton>
      </ThemedView>

      <ThemedView variant="card" style={styles.infoCard}>
        <ThemedText style={styles.cardTitle}>App Info</ThemedText>
        <ThemedText variant="muted">
          This is a multi-screen React Native app with black and white theming.
        </ThemedText>
      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20,
  },
  userCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
});
