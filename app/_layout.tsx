import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Auth from '../components/Auth';
import { Session } from '@supabase/supabase-js';
import { ThemeProvider } from '@rneui/themed';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import * as Font from 'expo-font';

// Define or import your themes
const DarkTheme = {
  colors: {
    background: '#121212',
    text: '#ffffff',
    primary: '#bb86fc',
    card: '#1f1f1f',
    border: '#272727',
    notification: '#ff80ab',
  },
};

const DefaultTheme = {
  colors: {
    background: '#ffffff',
    text: '#000000',
    primary: '#6200ee',
    card: '#f5f5f5',
    border: '#e0e0e0',
    notification: '#ff80ab',
  },
};



export default function RootLayout() {
  const colorScheme = useColorScheme();
    const [session, setSession] = useState<Session | null>(null);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!session) {
    return <Auth />;
  }

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

// Simple implementation using Expo's Font API
function useFonts(fontMap: { [key: string]: any }): [boolean] {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    Font.loadAsync(fontMap).then(() => {
      if (isMounted) setLoaded(true);
    });
    return () => {
      isMounted = false;
    };
  }, [fontMap]);

  return [loaded];
}

