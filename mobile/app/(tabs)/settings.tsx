import React from 'react';
import { StyleSheet, Switch } from 'react-native';
import { ThemedView, ThemedText, ThemedButton, ThemedScrollView } from '@/components/ui/themed';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsScreen() {
  const { theme, colors, toggleTheme } = useTheme();

  return (
    <ThemedScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText variant="large">Settings</ThemedText>
      </ThemedView>

      <ThemedView variant="card" style={styles.settingsCard}>
        <ThemedText style={styles.sectionTitle}>Appearance</ThemedText>
        
        <ThemedView style={styles.settingRow}>
          <ThemedView>
            <ThemedText>Dark Mode</ThemedText>
            <ThemedText variant="muted">Toggle between light and dark theme</ThemedText>
          </ThemedView>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.muted, true: colors.primary }}
            thumbColor={colors.background}
          />
        </ThemedView>
      </ThemedView>

      <ThemedView variant="card" style={styles.settingsCard}>
        <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>
        
        <ThemedView style={styles.settingRow}>
          <ThemedView>
            <ThemedText>Push Notifications</ThemedText>
            <ThemedText variant="muted">Receive app notifications</ThemedText>
          </ThemedView>
          <Switch
            value={true}
            onValueChange={() => {}}
            trackColor={{ false: colors.muted, true: colors.primary }}
            thumbColor={colors.background}
          />
        </ThemedView>
        
        <ThemedView style={styles.settingRow}>
          <ThemedView>
            <ThemedText>Email Notifications</ThemedText>
            <ThemedText variant="muted">Receive email updates</ThemedText>
          </ThemedView>
          <Switch
            value={false}
            onValueChange={() => {}}
            trackColor={{ false: colors.muted, true: colors.primary }}
            thumbColor={colors.background}
          />
        </ThemedView>
      </ThemedView>

      <ThemedView variant="card" style={styles.settingsCard}>
        <ThemedText style={styles.sectionTitle}>Privacy & Security</ThemedText>
        
        <ThemedButton
          variant="outline"
          onPress={() => {}}
          style={styles.settingButton}
        >
          Privacy Policy
        </ThemedButton>
        
        <ThemedButton
          variant="outline"
          onPress={() => {}}
          style={styles.settingButton}
        >
          Terms of Service
        </ThemedButton>
        
        <ThemedButton
          variant="outline"
          onPress={() => {}}
          style={styles.settingButton}
        >
          Data Export
        </ThemedButton>
      </ThemedView>

      <ThemedView variant="card" style={styles.settingsCard}>
        <ThemedText style={styles.sectionTitle}>About</ThemedText>
        
        <ThemedView style={styles.infoRow}>
          <ThemedText variant="muted">Version:</ThemedText>
          <ThemedText>1.0.0</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.infoRow}>
          <ThemedText variant="muted">Build:</ThemedText>
          <ThemedText>2024.01.01</ThemedText>
        </ThemedView>
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
  settingsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    flex: 1,
  },
  settingButton: {
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
});
