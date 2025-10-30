"use client"

import { ThemedText } from "@/components/ThemedText"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"

/**
 * Settings screen
 * Displays user settings and preferences
 */
export default function SettingsScreen() {
  const router = useRouter()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [biometricEnabled, setBiometricEnabled] = useState(false)
  const [darkModeEnabled, setDarkModeEnabled] = useState(true)

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.background}>
        <LinearGradient colors={["#000000", "#0a0a0a", "#000000"]} style={styles.gradient} />
      </View>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Settings</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Security Settings */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Security</ThemedText>

          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <ThemedText style={styles.settingLabel}>Two-Factor Authentication</ThemedText>
                <ThemedText style={styles.settingDesc}>Add an extra layer of security</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <ThemedText style={styles.settingLabel}>Biometric Login</ThemedText>
                <ThemedText style={styles.settingDesc}>Use fingerprint or face ID</ThemedText>
              </View>
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: "#1F2937", true: "#8B5CF6" }}
                thumbColor={biometricEnabled ? "#FFFFFF" : "#9CA3AF"}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <ThemedText style={styles.settingLabel}>Change Password</ThemedText>
                <ThemedText style={styles.settingDesc}>Update your account password</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>

          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <ThemedText style={styles.settingLabel}>Push Notifications</ThemedText>
                <ThemedText style={styles.settingDesc}>Receive alerts for transactions</ThemedText>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#1F2937", true: "#8B5CF6" }}
                thumbColor={notificationsEnabled ? "#FFFFFF" : "#9CA3AF"}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <ThemedText style={styles.settingLabel}>Price Alerts</ThemedText>
                <ThemedText style={styles.settingDesc}>Get notified on price changes</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <ThemedText style={styles.settingLabel}>Email Notifications</ThemedText>
                <ThemedText style={styles.settingDesc}>Receive updates via email</ThemedText>
              </View>
              <Switch
                value={true}
                onValueChange={() => {}}
                trackColor={{ false: "#1F2937", true: "#8B5CF6" }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Display Settings */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Display</ThemedText>

          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <ThemedText style={styles.settingLabel}>Dark Mode</ThemedText>
                <ThemedText style={styles.settingDesc}>Always use dark theme</ThemedText>
              </View>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: "#1F2937", true: "#8B5CF6" }}
                thumbColor={darkModeEnabled ? "#FFFFFF" : "#9CA3AF"}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <ThemedText style={styles.settingLabel}>Currency</ThemedText>
                <ThemedText style={styles.settingDesc}>USD (United States Dollar)</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <ThemedText style={styles.settingLabel}>Language</ThemedText>
                <ThemedText style={styles.settingDesc}>English</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>About</ThemedText>

          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <ThemedText style={styles.settingLabel}>App Version</ThemedText>
                <ThemedText style={styles.settingDesc}>1.0.0</ThemedText>
              </View>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <ThemedText style={styles.settingLabel}>Privacy Policy</ThemedText>
                <ThemedText style={styles.settingDesc}>Read our privacy policy</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <ThemedText style={styles.settingLabel}>Terms of Service</ThemedText>
                <ThemedText style={styles.settingDesc}>Read our terms</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: "#111827",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1F2937",
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: 4,
  },
  settingDesc: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  divider: {
    height: 1,
    backgroundColor: "#1F2937",
  },
})
