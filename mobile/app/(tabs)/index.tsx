import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AuthService, User } from '@/lib/auth';
import { ThemedView, ThemedText, ThemedButton, ThemedScrollView } from '@/components/ui/themed';
import { useTheme } from '@/contexts/ThemeContext';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  likes: number;
  comments: number;
}

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await AuthService.getUser();
      setUser(currentUser);
    };
    loadUser();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = await AuthService.getToken();
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.log('Failed to fetch posts:', response.status);
      }
    } catch (error) {
      console.log('Error fetching posts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

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

  const renderPost = ({ item }: { item: Post }) => (
    <ThemedView variant="card" style={styles.postCard}>
      <ThemedView style={styles.postHeader}>
        <ThemedView style={styles.authorInfo}>
          <ThemedView style={styles.avatar}>
            <ThemedText style={styles.avatarText}>
              {item.author.charAt(0).toUpperCase()}
            </ThemedText>
          </ThemedView>
          <ThemedView>
            <ThemedText style={styles.authorName}>{item.author}</ThemedText>
            <ThemedText variant="muted" style={styles.timestamp}>
              {formatTimestamp(item.createdAt)}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedText style={styles.postTitle}>{item.title}</ThemedText>
      <ThemedText variant="muted" style={styles.postContent}>
        {item.content}
      </ThemedText>

      <ThemedView style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={20} color={colors.mutedForeground} />
          <ThemedText variant="muted" style={styles.actionText}>
            {item.likes}
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color={colors.mutedForeground} />
          <ThemedText variant="muted" style={styles.actionText}>
            {item.comments}
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color={colors.mutedForeground} />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText variant="large">Feed</ThemedText>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color={colors.foreground} />
          </TouchableOpacity>
        </ThemedView>
        <ThemedView style={styles.loadingContainer}>
          <ThemedText variant="muted">Loading posts...</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText variant="large">Feed</ThemedText>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={colors.foreground} />
        </TouchableOpacity>
      </ThemedView>

      {user && (
        <ThemedView variant="secondary" style={styles.welcomeBar}>
          <ThemedText variant="muted">
            Welcome back, {user.name || user.email}!
          </ThemedText>
        </ThemedView>
      )}

      {posts.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText variant="muted">No posts yet. Be the first to post!</ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.feedContainer}
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
  welcomeBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
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
  feedContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for tab bar
  },
  postCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  postHeader: {
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  authorName: {
    fontWeight: '600',
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
  },
});
