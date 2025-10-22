import { Session } from '@supabase/supabase-js';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-gesture-handler'; // Must be first import in the entry file for RN
import 'react-native-reanimated'; // Must be loaded before any reanimated usage
import Auth from '../components/Auth';
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
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription?.subscription.unsubscribe();
  }, []);

  if (!session) return <Auth />;

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}