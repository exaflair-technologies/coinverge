import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Input, Button } from '@rneui/themed';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function ImprovedAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const { signIn, signUp, resetPassword, loading } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const { error } = await signIn(email.trim(), password);
    if (error) {
      Alert.alert('Sign In Failed', error.message);
    }
  };

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    const { error } = await signUp(email.trim(), password);
    if (error) {
      Alert.alert('Sign Up Failed', error.message);
    } else {
      Alert.alert(
        'Success',
        'Account created! Please check your email for verification.',
        [{ text: 'OK', onPress: () => setIsSignUp(false) }]
      );
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    const { error } = await resetPassword(forgotPasswordEmail.trim());
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert(
        'Success',
        'Password reset email sent! Please check your inbox.',
        [{ text: 'OK', onPress: () => setShowForgotPassword(false) }]
      );
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setPassword('');
    setConfirmPassword('');
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    setForgotPasswordEmail('');
  };

  if (showForgotPassword) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>
                Enter your email address and we&apos;ll send you a link to reset your password.
              </Text>
            </View>

            <View style={styles.form}>
              <Input
                label="Email"
                placeholder="Enter your email"
                value={forgotPasswordEmail}
                onChangeText={setForgotPasswordEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#8b45ff' }}
                inputStyle={styles.input}
                labelStyle={styles.label}
              />

              <Button
                title="Send Reset Email"
                onPress={handleForgotPassword}
                loading={loading}
                disabled={loading}
                buttonStyle={styles.primaryButton}
                titleStyle={styles.buttonTitle}
              />

              <TouchableOpacity onPress={toggleForgotPassword} style={styles.linkButton}>
                <Text style={styles.linkText}>Back to {isSignUp ? 'Sign Up' : 'Sign In'}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome to Coinverge</Text>
            <Text style={styles.subtitle}>
              {isSignUp ? 'Create your account to get started' : 'Sign in to your account'}
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#8b45ff' }}
              inputStyle={styles.input}
              labelStyle={styles.label}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              leftIcon={{ type: 'font-awesome', name: 'lock', color: '#8b45ff' }}
              inputStyle={styles.input}
              labelStyle={styles.label}
            />

            {isSignUp && (
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                leftIcon={{ type: 'font-awesome', name: 'lock', color: '#8b45ff' }}
                inputStyle={styles.input}
                labelStyle={styles.label}
              />
            )}

            <Button
              title={isSignUp ? 'Create Account' : 'Sign In'}
              onPress={isSignUp ? handleSignUp : handleSignIn}
              loading={loading}
              disabled={loading}
              buttonStyle={styles.primaryButton}
              titleStyle={styles.buttonTitle}
            />

            {!isSignUp && (
              <TouchableOpacity onPress={toggleForgotPassword} style={styles.linkButton}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={toggleAuthMode} style={styles.linkButton}>
              <Text style={styles.linkText}>
                {isSignUp ? 'Already have an account? Sign In' : "Don&apos;t have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    width: '100%',
  },
  input: {
    color: '#ffffff',
  },
  label: {
    color: '#ffffff',
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: '#8b45ff',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 20,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#8b45ff',
    fontSize: 14,
    fontWeight: '500',
  },
});
