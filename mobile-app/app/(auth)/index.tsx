import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blaze Neuro</Text>
      <Link href="/(auth)/sign-in" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign in with Email</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/(auth)/sign-up" asChild>
        <TouchableOpacity style={[styles.button, styles.signUpButton]}>
          <Text style={[styles.buttonText, styles.signUpButtonText]}>Sign Up</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  signUpButtonText: {
    color: '#fff',
  },
});
