import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthService } from '@/lib/auth';
import { ThemedView, ThemedText } from '@/components/ui/themed';
import { useTheme } from '@/contexts/ThemeContext';

interface Project {
  id: string;
  name: string;
  description: string;
  owner: string;
  createdAt: string;
  fileCount: number;
}

export default function ProjectsScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = await AuthService.getToken();
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/projects`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.log('Failed to fetch projects:', response.status);
      }
    } catch (error) {
      console.log('Error fetching projects:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProjects();
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };

  const renderProject = ({ item }: { item: Project }) => (
    <ThemedView variant="card" style={styles.projectCard}>
      <ThemedView style={styles.projectHeader}>
        <ThemedView style={styles.projectIcon}>
          <Ionicons name="folder" size={24} color={colors.primary} />
        </ThemedView>
        <ThemedView style={styles.projectInfo}>
          <ThemedText style={styles.projectName}>{item.name}</ThemedText>
          <ThemedText variant="muted" style={styles.projectOwner}>
            by {item.owner}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedText variant="muted" style={styles.projectDescription}>
        {item.description}
      </ThemedText>

      <ThemedView style={styles.projectFooter}>
        <ThemedView style={styles.projectStats}>
          <Ionicons name="document" size={16} color={colors.mutedForeground} />
          <ThemedText variant="muted" style={styles.statText}>
            {item.fileCount} files
          </ThemedText>
        </ThemedView>
        <ThemedText variant="muted" style={styles.projectDate}>
          {formatDate(item.createdAt)}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText variant="large">Projects</ThemedText>
        </ThemedView>
        <ThemedView style={styles.loadingContainer}>
          <ThemedText variant="muted">Loading projects...</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText variant="large">Projects</ThemedText>
        <TouchableOpacity>
          <Ionicons name="add" size={24} color={colors.foreground} />
        </TouchableOpacity>
      </ThemedView>

      {projects.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <Ionicons name="folder-outline" size={64} color={colors.mutedForeground} />
          <ThemedText variant="muted" style={styles.emptyText}>
            No projects yet
          </ThemedText>
          <ThemedText variant="muted" style={styles.emptySubtext}>
            Create your first project to get started
          </ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={projects}
          renderItem={renderProject}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.projectsContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: 'center',
  },
  projectsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  projectCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  projectIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  projectOwner: {
    fontSize: 12,
  },
  projectDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
  },
  projectDate: {
    fontSize: 12,
  },
});
