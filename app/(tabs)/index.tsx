
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Welcome to Coinverge</ThemedText>
          <ThemedText type="subtitle">Your Crypto Trading Dashboard</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.content}>
          <ThemedText style={styles.greeting}>
            Hello, {user?.email?.split('@')[0] || 'User'}! 👋
          </ThemedText>
          <ThemedText style={styles.description}>
            You are successfully logged in and ready to start trading cryptocurrencies.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.features}>
          <ThemedText type="subtitle" style={styles.featuresTitle}>
            What you can do:
          </ThemedText>
          
          <View style={styles.featureItem}>
            <ThemedText style={styles.featureIcon}>📈</ThemedText>
            <ThemedText style={styles.featureText}>View real-time crypto prices and charts</ThemedText>
          </View>
          
          <View style={styles.featureItem}>
            <ThemedText style={styles.featureIcon}>💰</ThemedText>
            <ThemedText style={styles.featureText}>Buy and sell cryptocurrencies</ThemedText>
          </View>
          
          <View style={styles.featureItem}>
            <ThemedText style={styles.featureIcon}>📊</ThemedText>
            <ThemedText style={styles.featureText}>Track your portfolio performance</ThemedText>
          </View>
          
          <View style={styles.featureItem}>
            <ThemedText style={styles.featureIcon}>⚙️</ThemedText>
            <ThemedText style={styles.featureText}>Manage your account settings</ThemedText>
          </View>
        </ThemedView>

        <ThemedView style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Navigate using the tabs below to explore all features.
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  features: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  featuresTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
    width: 30,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 20,
  },
});
