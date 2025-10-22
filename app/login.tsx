import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/themed';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

/**
 * Login screen component with Web3 theme
 * Features social login options and secure authentication
 */
export default function LoginScreen() {
  const router = useRouter();

  /**
   * Handle social login button press
   */
  const handleSocialLogin = async (provider: string) => {
    console.log(`Login with ${provider}`);
    // TODO: Implement social login logic
    // Mark intro as completed and navigate to dashboard
    try {
      await AsyncStorage.setItem('intro_completed', 'true');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error storing intro completion:', error);
      router.push('/dashboard');
    }
  };

  /**
   * Handle Get Started button press
   */
  const handleGetStarted = async () => {
    try {
      // Mark intro as completed and navigate to dashboard
      await AsyncStorage.setItem('intro_completed', 'true');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error storing intro completion:', error);
      router.push('/dashboard');
    }
  };

  /**
   * Handle back navigation
   */
  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Background with gradient overlay */}
      <View style={styles.background}>
        <LinearGradient
          colors={['#000000', '#0a0a0a', '#000000']}
          style={styles.gradient}
        />
      </View>

      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Main content */}
      <View style={styles.content}>
        {/* Illustration section - using login.png image */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../assets/images/login.png')}
            style={styles.loginImage}
            contentFit="contain"
          />
        </View>

        {/* Text content */}
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>
            Sign in Securely with Coinverge Identity
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Powered by Web3 – Your Gateway to the Decentralized World
          </ThemedText>
        </View>

        {/* Social login icons */}
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity 
            style={styles.socialButton} 
            onPress={() => handleSocialLogin('Facebook')}
          >
            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.socialButton} 
            onPress={() => handleSocialLogin('Google')}
          >
            <Ionicons name="logo-google" size={24} color="#DB4437" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.socialButton} 
            onPress={() => handleSocialLogin('Apple')}
          >
            <Ionicons name="logo-apple" size={24} color="#000000" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.socialButton} 
            onPress={() => handleSocialLogin('LinkedIn')}
          >
            <Ionicons name="logo-linkedin" size={24} color="#0077B5" />
          </TouchableOpacity>
        </View>

        {/* Get Started button */}
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['#8B5CF6', '#3B82F6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Button
              title="Get Started"
              onPress={handleGetStarted}
              buttonStyle={styles.getStartedButton}
              titleStyle={styles.buttonText}
            />
          </LinearGradient>
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
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
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
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 40,
  },
  loginImage: {
    width: width * 1.6,
    height: height * 0.6,
    maxWidth: 700,
    maxHeight: 600,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  gradientButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  getStartedButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
