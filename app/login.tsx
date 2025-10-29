import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
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
   * Navigates to the email/password authentication page
   * TODO: Implement actual social login provider integration with Supabase
   */
  const handleSocialLogin = async (provider: string) => {
    console.log(`Login with ${provider}`);
    // For now, all social logins navigate to email/password auth page
    // TODO: Implement actual OAuth flows for each provider
    router.push('/auth');
  };

  /**
   * Handle email login button press
   * Navigates to the email/password authentication page
   */
  const handleEmailLogin = () => {
    router.push('/auth');
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
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

        {/* Social login icons - Mail and Google only */}
        <View style={styles.socialLoginContainer}>
          {/* Email option */}
          <TouchableOpacity 
            style={styles.socialButton} 
            onPress={handleEmailLogin}
          >
            <Ionicons name="mail" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          {/* Google option */}
          <TouchableOpacity 
            style={styles.socialButton} 
            onPress={() => handleSocialLogin('Google')}
          >
            <Ionicons name="logo-google" size={24} color="#DB4437" />
          </TouchableOpacity>
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
