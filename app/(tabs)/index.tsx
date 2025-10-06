
import { Image } from 'expo-image';
import {  Platform, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';

import React from 'react';
import { View, Alert, GestureResponderEvent } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@rneui/themed';
import { supabase } from '@/lib/supabase';

export default function HomeScreen() {
  // Import the correct type for your navigation (adjust the import path as needed)
  // import { StackNavigationProp } from '@react-navigation/stack';
  // import { RootStackParamList } from '@/types/navigation'; // Define this type according to your navigator

  // Example for a stack navigator:
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

  // If you don't have types set up, you can use 'any' as a quick fix:
  const navigation = useNavigation<any>();

  const handleSignOut = () => {
    // Add your signout logic here (e.g., clearing tokens)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }], // Change 'Auth' to your actual sign-in/sign-up route name if needed
    });
  };
  async function handleLogout(event: GestureResponderEvent): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert('Sign Out Failed', error.message);
        return;
      }
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } catch (err: any) {
      Alert.alert('Sign Out Error', err.message || 'An unexpected error occurred.');
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Dashboard</ThemedText>
        <ThemedText type="subtitle">Welcome to Coinverge!</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.content}>
        <ThemedText>You are successfully logged in!</ThemedText>
        <ThemedText>This is your main dashboard screen.</ThemedText>
      </ThemedView>

      <ThemedView style={styles.actions}>
        <Button 
          title="Sign Out" 
          onPress={handleLogout}
          buttonStyle={styles.logoutButton}
        />
      </ThemedView>

      
      {/* Sign Out Button */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  actions: {
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
  },
  signOutContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
});
