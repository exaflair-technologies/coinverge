"use client"

import { Button } from "@rneui/themed"
import { Image } from "expo-image"
import { useRouter, type Href } from "expo-router"
import { useEffect } from "react"
import { Dimensions, StatusBar, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ThemedText } from "../components/ThemedText"
import { supabase } from "../lib/supabase"

const { width, height } = Dimensions.get("window")

/**
 * Landing/Onboarding screen component
 *
 * This is the first screen that new users see when they open the app.
 * Displays the initial welcome screen with "Get Started" button that
 * navigates to the social login selection page.
 * If user is already authenticated, redirects to dashboard.
 */
export default function LandingScreen() {
  const router = useRouter()

  /**
   * Check if user is authenticated (robust) and redirect to tabs
   */
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      // Verify user to avoid redirect bounce during logout
      const { data: userData, error } = await supabase.auth.getUser()
      if (!error && userData.user) {
        router.replace('/(tabs)' as Href)
      }
    }

    checkSession()
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.replace('/(tabs)' as Href)
      }
    })
    return () => subscription.subscription?.unsubscribe()
  }, [router])

  /**
   * Handle Get Started button press
   * Navigates to the login screen with social login options
   */
  const handleGetStarted = () => {
    router.push("/login")
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Main content */}
      <View style={styles.content}>
        {/* Illustration section - using db.png image */}
        <View style={styles.illustrationContainer}>
          <Image source={require("../assets/images/db.png")} style={styles.logoImage} contentFit="contain" />
        </View>

        {/* Text content */}
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>Coinverge - Your Crypto, Your Control</ThemedText>
          <ThemedText style={styles.subtitle}>
            Step into the future of secure digital wealth. Smarter. Safer. Stronger.
          </ThemedText>
        </View>

        {/* Call to action button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            buttonStyle={styles.getStartedButton}
            titleStyle={styles.buttonText}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  logoImage: {
    width: width * 1.5,
    height: height * 0.5625,
    maxWidth: 656.25,
    maxHeight: 562.5,
    resizeMode: "contain",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  getStartedButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
})
