import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useRouter } from 'expo-router';

const onboardingSteps = [
  {
    title: 'Welcome to Blaze Neuro',
    description: 'The future of neuro-technology is in your hands.',
  },
  {
    title: 'Explore and Discover',
    description: 'Navigate through cutting-edge projects and research.',
  },
  {
    title: 'Collaborate and Innovate',
    description: 'Connect with a community of pioneers and creators.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0}>
        {onboardingSteps.map((step, index) => (
          <View key={index} style={styles.page}>
            <Text style={styles.title}>{step.title}</Text>
            <Text style={styles.description}>{step.description}</Text>
            {index === onboardingSteps.length - 1 && (
              <TouchableOpacity style={styles.button} onPress={() => router.replace('/(auth)')}>
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    marginTop: 40,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: '#000',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
