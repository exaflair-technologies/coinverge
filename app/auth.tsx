import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import LoadingScreen from '@/components/LoadingScreen';

export default function AuthRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Loading..." />;
  }

  // If user is already authenticated, redirect to main app
  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  // This route should never be reached as the main layout handles auth
  // But it's here as a fallback
  return <Redirect href="/(tabs)" />;
}