import React, { ReactNode } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireVerification?: boolean;
  fallback?: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
  requireVerification = false,
  fallback,
  redirectTo = '/auth',
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8b45ff" />
      </View>
    );
  }

  // Check authentication requirement
  if (requireAuth && !isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }
    // Redirect to auth screen
    router.replace(redirectTo);
    return null;
  }

  // Check email verification requirement
  if (requireVerification && user && !user.email_confirmed_at) {
    if (fallback) {
      return <>{fallback}</>;
    }
    // Redirect to verification screen
    router.replace('/verify-email');
    return null;
  }

  // If all checks pass, render children
  return <>{children}</>;
}

// Specialized components for common use cases
export function AuthRequired({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute requireAuth={true} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

export function GuestOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute requireAuth={false} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

export function VerifiedOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute requireAuth={true} requireVerification={true} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
});
