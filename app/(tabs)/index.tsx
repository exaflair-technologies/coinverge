import { Button } from '@rneui/themed';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '../../components/ThemedText';
const { width, height } = Dimensions.get('window');

/**
 * Intro/Onboarding screen component
 * Displays the initial welcome screen before authentication
 */
export default function IntroScreen() {
  const router = useRouter();

  /**
   * Navigate to login screen
   */
  const handleGetStarted = () => {
    // Navigate to login screen
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Background with gradient overlay */}
      <View style={styles.background}>
        <LinearGradient
          colors={['#000000', '#1a1a1a', '#000000']}
          style={styles.gradient}
        />
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {/* Illustration section - using db.png image */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../../assets/images/db.png')}
            style={styles.logoImage}
            contentFit="contain"
          />
        </View>

        {/* Text content */}
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>
            Coinverge - Your Crypto, Your Control
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Step into the future of secure digital wealth. Smarter. Safer. Stronger.
          </ThemedText>
        </View>

        {/* Call to action button */}
        <View style={styles.buttonContainer}>
        <LinearGradient
          colors={['#8B5CF6', '#7C3AED']}
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoImage: {
    width: width * 1.5,
    height: height * 0.5625,
    maxWidth: 656.25,
    maxHeight: 562.5,
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
    textAlign: 'left',
    lineHeight: 24,
    paddingHorizontal: 20,
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
