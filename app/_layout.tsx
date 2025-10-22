import { useEffect, useState } from 'react';

import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import * as Font from 'expo-font';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ImprovedAuth from '@/components/ImprovedAuth';
import LoadingScreen from '@/components/LoadingScreen';

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



function AppContent() {
  const { user, loading } = useAuth();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Show loading screen while fonts are loading or auth is initializing
  if (!loaded || loading) {
    return <LoadingScreen message={loading ? "Checking authentication..." : "Loading fonts..."} />;
  }

  // Show auth screen if user is not authenticated
  if (!user) {
    return <ImprovedAuth />;
  }

  // Show main app if user is authenticated
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
        <StatusBar style="auto" />
      </AuthProvider>
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

