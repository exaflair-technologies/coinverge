import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input } from '@rneui/themed';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, AppState, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';

/**
 * AppState listener for auto-refresh when app becomes active
 */
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

/**
 * Authentication screen component
 * 
 * Displays email/password form for signing in or signing up.
 * After successful authentication, navigates to the dashboard/home page.
 */
export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  /**
   * Sign in with email and password trigger
   * On success, navigates to dashboard/home page
   */
  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Sign In Error', error.message);
      setLoading(false);
    } else if (data?.session) {
      // Successful sign in - navigation will happen via auth state change listener
      setLoading(false);
    }
  }

  /**
   * Sign up with email and password
   * On success, shows verification message or navigates if session is created
   */
  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Sign Up Error', error.message);
      setLoading(false);
    } else if (!session) {
      Alert.alert('Verification Email Sent', 'Please check your inbox for email verification!');
      setLoading(false);
    } else {
      // Session created - navigation will happen via auth state change listener
      setLoading(false);
    }
  }

  /**
   * Handle back navigation
   * Navigates back to login page if navigation history exists, otherwise goes to login
   */
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/login');
    }
  };

  // Check for existing session and listen for auth state changes
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        // Navigate to dashboard/home if session exists
        router.replace('/dashboard');
      }
    };
    
    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        // Navigate to dashboard/home after successful sign in
        router.replace('/dashboard');
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // If user is already logged in, don't show the form
  if (user) {
    return null; // Will navigate away
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Main content */}
      <View style={styles.content}>
        <View style={styles.formContainer}>
          {/* Email input */}
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail" size={20} color="#333333" style={styles.inputIcon} />
              <Input
                placeholder="Enter your email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                autoCapitalize={'none'}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={styles.inputFieldContainer}
                leftIcon={undefined}
              />
            </View>
          </View>

          {/* Password input */}
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Password</ThemedText>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed" size={20} color="#333333" style={styles.inputIcon} />
              <Input
                placeholder="••••••••"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                autoCapitalize={'none'}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={styles.inputFieldContainer}
                leftIcon={undefined}
              />
            </View>
          </View>

          {/* Sign in button */}
          <View style={styles.buttonContainer}>
            <Button 
              title="Sign in" 
              disabled={loading} 
              onPress={() => signInWithEmail()}
              buttonStyle={styles.signInButton}
              titleStyle={styles.buttonText}
            />
          </View>

          {/* Sign up button */}
          <View style={styles.buttonContainer}>
            <Button 
              title="Sign up" 
              disabled={loading} 
              onPress={() => signUpWithEmail()}
              buttonStyle={styles.signUpButton}
              titleStyle={styles.buttonText}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    paddingHorizontal: 12,
    minHeight: 56,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  inputFieldContainer: {
    flex: 1,
    paddingHorizontal: 0,
    margin: 0,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  signInButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
  },
  signUpButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
