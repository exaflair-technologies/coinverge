import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface LoadingScreenProps {
  message?: string;
  size?: 'small' | 'large';
}

export default function LoadingScreen({ 
  message = 'Loading...', 
  size = 'large' 
}: LoadingScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size={size} color="#8b45ff" />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 16,
  },
  message: {
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: '500',
  },
});
