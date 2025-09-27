import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { AuthService, User } from '@/lib/auth';
import { ThemedView, ThemedText, ThemedButton, ThemedScrollView } from '@/components/ui/themed';

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await AuthService.getUser();
      setUser(currentUser);
    };
    loadUser();
  }, []);

  return (
    <ThemedScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText variant="large">Profile</ThemedText>
      </ThemedView>

      {user && (
        <ThemedView variant="card" style={styles.profileCard}>
          <ThemedText style={styles.sectionTitle}>User Information</ThemedText>
          
          <ThemedView style={styles.infoRow}>
            <ThemedText variant="muted">Name:</ThemedText>
            <ThemedText>{user.name || 'Not provided'}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.infoRow}>
            <ThemedText variant="muted">Email:</ThemedText>
            <ThemedText>{user.email}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.infoRow}>
            <ThemedText variant="muted">Role:</ThemedText>
            <ThemedText>{user.role}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.infoRow}>
            <ThemedText variant="muted">User ID:</ThemedText>
            <ThemedText variant="small">{user.id}</ThemedText>
          </ThemedView>
        </ThemedView>
      )}

      <ThemedView variant="card" style={styles.actionsCard}>
        <ThemedText style={styles.sectionTitle}>Account Actions</ThemedText>
        
        <ThemedButton
          variant="outline"
          onPress={() => {}}
          style={styles.actionButton}
        >
          Edit Profile
        </ThemedButton>
        
        <ThemedButton
          variant="outline"
          onPress={() => {}}
          style={styles.actionButton}
        >
          Change Password
        </ThemedButton>
        
        <ThemedButton
          variant="destructive"
          onPress={() => {}}
          style={styles.actionButton}
        >
          Delete Account
        </ThemedButton>
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
  profileCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  actionsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
});
