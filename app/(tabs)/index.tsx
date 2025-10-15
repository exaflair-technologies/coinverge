// Navigation reset to a non-existent 'Auth' route caused errors.
// We rely on session-driven routing in `app/_layout.tsx` instead.
import { StyleSheet } from 'react-native';


import React from 'react';
import { Alert, GestureResponderEvent } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { supabase } from '@/lib/supabase';
import { Button } from '@rneui/themed';

/**
 * Dashboard home screen.
 *
 * Auth flow note: We do NOT imperatively navigate to an 'Auth' route.
 * Instead, we sign the user out and let `app/_layout.tsx` render `<Auth />`
 * when the Supabase auth listener detects a null session.
 */
export default function HomeScreen() {
  /**
   * Signs out via Supabase and relies on the global session listener to
   * re-render the app state, avoiding direct navigation resets to 'Auth'.
   */
  async function handleLogout(event: GestureResponderEvent): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert('Sign Out Failed', error.message);
        return;
      }
      // Successful sign out: Root layout will switch to <Auth /> automatically
      // through the Supabase auth state change listener.
    } catch (err: any) {
      Alert.alert('Sign Out Error', err.message || 'An unexpected error occurred.');
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Dashboard</ThemedText>
        <ThemedText type="subtitle">Hey</ThemedText>
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
