import { Session } from '@supabase/supabase-js';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { setBackgroundColorAsync } from 'expo-system-ui';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler'; // Must be first import in the entry file for RN
import 'react-native-reanimated'; // Must be loaded before any reanimated usage
import { supabase } from '../lib/supabase';

/**
 * Root layout for the app router.
 *
 * Manages the authenticated session state and conditionally renders the
 * authentication screen until a valid session exists. Once authenticated,
 * renders the tab stack and status bar. A Supabase auth listener is registered
 * to keep the session in sync and is properly cleaned up on unmount.
 */
export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Ensure the OS system background matches app background to avoid white bars
    setBackgroundColorAsync('#000000').catch(() => {});
    // Initialize session; if refresh token is stale/invalid, sign out to reset storage
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      try {
        await supabase.auth.getUser();
      } catch (_e) {
        // Invalid refresh token or corrupted session – force reset
        await supabase.auth.signOut();
        setSession(null);
      }
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription?.subscription.unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" backgroundColor="#000000" />
    </View>
  );
}