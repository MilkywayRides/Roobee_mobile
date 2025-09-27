import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Platform } from 'react-native';

const getApiBaseUrl = () => {
  if (__DEV__) {
    return 'https://please-eternal-merry-messages.trycloudflare.com'; // Cloudflare tunnel
  }
  return 'https://your-production-api.com';
};

export function NetworkTest() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<string>('');

  const testConnection = async () => {
    setTesting(true);
    setResult('Testing...');
    
    const apiUrl = getApiBaseUrl();
    console.log('Testing connection to:', apiUrl);
    
    try {
      const response = await fetch(`${apiUrl}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setResult(`✅ Connected! ${JSON.stringify(data)}`);
      } else {
        setResult(`❌ Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Network test error:', error);
      setResult(`❌ Network error: ${error.message}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Network Test</Text>
      <Text style={styles.url}>Testing: {getApiBaseUrl()}</Text>
      <Text style={styles.platform}>Platform: {Platform.OS}</Text>
      
      <TouchableOpacity 
        style={[styles.button, testing && styles.buttonDisabled]} 
        onPress={testConnection}
        disabled={testing}
      >
        <Text style={styles.buttonText}>
          {testing ? 'Testing...' : 'Test Connection'}
        </Text>
      </TouchableOpacity>
      
      {result ? <Text style={styles.result}>{result}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    margin: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  url: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  platform: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  result: {
    marginTop: 15,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    fontSize: 12,
  },
});
