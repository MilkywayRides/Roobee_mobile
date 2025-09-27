import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { AuthService } from '@/lib/auth';
import { ThemedView, ThemedText, ThemedButton, ThemedInput, ThemedScrollView } from '@/components/ui/themed';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await AuthService.login(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText variant="large">Sign In</ThemedText>
      </ThemedView>

      <ThemedView variant="card" style={styles.formCard}>
        <ThemedText style={styles.formTitle}>Welcome Back</ThemedText>
        <ThemedText variant="muted" style={styles.formSubtitle}>
          Sign in to your account to continue
        </ThemedText>

        <ThemedView style={styles.form}>
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <ThemedInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              style={styles.input}
            />
          </ThemedView>

          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Password</ThemedText>
            <ThemedInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              style={styles.input}
            />
          </ThemedView>

          <ThemedButton
            onPress={handleSignIn}
            style={styles.signInButton}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </ThemedButton>

          <ThemedView style={styles.divider}>
            <ThemedText variant="muted">Don't have an account?</ThemedText>
          </ThemedView>

          <ThemedButton
            variant="outline"
            onPress={() => router.push('/(auth)/sign-up')}
            style={styles.signUpButton}
          >
            Create Account
          </ThemedButton>
        </ThemedView>
      </ThemedView>

      <ThemedView variant="card" style={styles.testCard}>
        <ThemedText style={styles.testTitle}>Test Credentials</ThemedText>
        <ThemedText variant="muted">Email: test@example.com</ThemedText>
        <ThemedText variant="muted">Password: password123</ThemedText>
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
    marginBottom: 32,
    paddingTop: 60,
  },
  formCard: {
    padding: 24,
    borderRadius: 12,
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  formSubtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 48,
  },
  signInButton: {
    height: 48,
    marginTop: 8,
  },
  divider: {
    alignItems: 'center',
    marginVertical: 16,
  },
  signUpButton: {
    height: 48,
  },
  testCard: {
    padding: 16,
    borderRadius: 12,
  },
  testTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
});
