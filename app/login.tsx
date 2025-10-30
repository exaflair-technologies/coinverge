import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { useRouter, type Href } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Keyboard, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';

const { width, height } = Dimensions.get('window');

/**
 * Login screen component with Web3 theme
 * Features social login options and secure authentication
 */
export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  // Complete any pending auth sessions when the app resumes
  WebBrowser.maybeCompleteAuthSession();

  // Navigate when a session is established
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        router.replace('/(tabs)' as Href);
      }
    });
    return () => subscription.subscription?.unsubscribe();
  }, [router]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const passwordRef = useRef<TextInput>(null);

  // Launch Google OAuth with Supabase using Expo deep linking
  const handleGoogleLogin = async () => {
    try {
      // Use a dedicated callback path that you must also add in Supabase Auth redirect URLs
      const redirectTo = Linking.createURL('/auth/callback');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo, skipBrowserRedirect: true },
      });
      if (error) throw error;
      if (data?.url) {
        await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
      }
    } catch (e: any) {
      Alert.alert('Google Sign-in failed', e?.message ?? 'Unknown error');
    }
  };

  const handleEmailSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter email and password.');
      return;
    }
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) throw error;
      // onAuthStateChange will handle navigation
    } catch (e: any) {
      setLoading(false);
      Alert.alert('Sign in failed', e?.message ?? 'Unknown error');
    }
  };

  /**
   * Handle back navigation
   * Navigates back to landing page if navigation history exists, otherwise goes to index
   */
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top','bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Back button */}
      <TouchableOpacity style={[styles.backButton, { top: insets.top + 8 }]} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Main content */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.flex1}>
          <View style={styles.background}>
            <LinearGradient
              colors={["#000000", "#000000"]}
              style={styles.gradient}
            />
          </View>
      <KeyboardAvoidingView
            style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={120}
          >
        {/* Illustration */}
        <View style={[
          styles.illustrationContainer,
          inputFocused && { height: 80, marginBottom: 6 },
        ]}>
          <Image
            source={require('../assets/images/Bitcoin-rafiki.png')}
            style={[styles.loginImage, inputFocused && { width: '48%' }]}
            contentFit="contain"
          />
        </View>

        {/* Text content */}
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>
            Sign in Securely with Coinverge Identity
          </ThemedText>
        </View>

        {/* Email/Password form with social inside */}
          <View style={styles.formCard}>
          <View style={styles.fieldWrap}> 
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#BABFC7"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => passwordRef.current?.focus()}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
            />
          </View>
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#BABFC7"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              ref={passwordRef}
              returnKeyType="done"
              onSubmitEditing={handleEmailSignIn}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
            />
          </View>
          <TouchableOpacity style={styles.signInBtn} activeOpacity={0.9} onPress={handleEmailSignIn} disabled={loading}>
            <Text style={styles.signInBtnText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social login round icons */}
          <View style={styles.circleSocialRow}>
            <TouchableOpacity
              style={[styles.circleBtn, { borderColor: '#F3F4F6' }]}
              onPress={handleGoogleLogin}
              activeOpacity={0.85}
              accessibilityLabel="Continue with Google"
            >
              <Image
                source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }}
                style={styles.providerIcon}
                contentFit="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.circleBtn, { borderColor: '#F3F4F6' }]}
              onPress={() => Alert.alert('Coming soon', 'Apple Sign-in will be available soon')}
              activeOpacity={0.85}
              accessibilityLabel="Continue with Apple"
            >
              <Ionicons name="logo-apple" size={22} color="#111827" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.circleBtn, { borderColor: '#F3F4F6' }]}
              onPress={() => Alert.alert('Coming soon', 'GitHub Sign-in will be available soon')}
              activeOpacity={0.85}
              accessibilityLabel="Continue with GitHub"
            >
              <Ionicons name="logo-github" size={22} color="#111827" />
            </TouchableOpacity>
          </View>
          </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
  },
  gradient: {
    flex: 1,
  },
  flex1: { flex: 1 },
  container: {
    flex: 1, backgroundColor: '#000000',
  },
  backButton: {
    position: 'absolute', left: 20, zIndex: 10, padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
    // Avoid double spacing with SafeArea top/bottom
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  illustrationContainer: {
    width: '100%', height: 150, justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  loginImage: {
    width: '68%', height: '100%',
  },
  textContainer: {
    alignItems: 'center', marginBottom: 30, paddingHorizontal: 6,
  },
  title: {
    fontSize: 26, fontWeight: '700', color: '#fff', textAlign: 'center', marginBottom: 16, lineHeight: 32,
  },
  subtitle: {
    fontSize: 15, color: '#CED9FF', textAlign: 'center', lineHeight: 22, fontWeight: '400', paddingHorizontal: 2,
  },
  socialLoginContainer: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16, gap: 18,
  },
  socialButton: {
    width: 58, height: 58, borderRadius: 29, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', marginHorizontal: 6,
    borderWidth: 0, shadowColor: '#151A25', shadowOpacity: 0.2, shadowRadius: 10, elevation: 5,
  },
  iconWrapper: {
    flex:1, width: '100%', height: '100%', borderRadius: 29, alignItems: 'center', justifyContent: 'center',
  },
  formCard: {
    width: '88%',
    maxWidth: 400,
    marginTop: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#F2F3F5',
    shadowColor: '#0B0E14',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  fieldWrap: { marginBottom: 16 },
  label: { fontSize: 16, color: '#232323', fontWeight: '700', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#E7E9EE',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#232323',
  },
  signInBtn: {
    height: 48,
    backgroundColor: '#222',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  signInBtnText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  dividerRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 16, marginBottom: 10,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E6E7E8' },
  dividerText: { color: '#6B7280', fontSize: 12 },
  inlineSocialRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 6 },
  circleSocialRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 14, marginTop: 8 },
  circleBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerIcon: { width: 22, height: 22 },
});
