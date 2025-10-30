"use client"

import { ThemedText } from "@/components/ThemedText"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { supabase } from "../lib/supabase"

/**
 * Profile screen
 * Displays user profile information and account details
 */
export default function ProfileScreen() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState("")
  const [userInitial, setUserInitial] = useState("N")

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user?.email) {
        setUserEmail(user.email)
        setUserInitial(user.email[0].toUpperCase())
      }
    }
    fetchUserData()
  }, [])

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.background}>
        <LinearGradient colors={["#000000", "#0a0a0a", "#000000"]} style={styles.gradient} />
      </View>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Profile</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.largeAvatar}>
            <ThemedText style={styles.largeInitial}>{userInitial}</ThemedText>
          </View>
          <ThemedText style={styles.userName}>User Account</ThemedText>
          <ThemedText style={styles.userEmail}>{userEmail}</ThemedText>
        </View>

        {/* Account Information */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Account Information</ThemedText>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Email</ThemedText>
              <ThemedText style={styles.infoValue}>{userEmail}</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Account Status</ThemedText>
              <View style={styles.statusBadge}>
                <ThemedText style={styles.statusText}>Active</ThemedText>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Member Since</ThemedText>
              <ThemedText style={styles.infoValue}>Jan 2024</ThemedText>
            </View>
          </View>
        </View>

        {/* Portfolio Summary */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Portfolio Summary</ThemedText>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <ThemedText style={styles.summaryLabel}>Total Balance</ThemedText>
              <ThemedText style={styles.summaryValue}>$87,412.50</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <ThemedText style={styles.summaryLabel}>Total Gain/Loss</ThemedText>
              <ThemedText style={[styles.summaryValue, { color: "#10B981" }]}>+$8,741.25 (+10.2%)</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <ThemedText style={styles.summaryLabel}>Assets Held</ThemedText>
              <ThemedText style={styles.summaryValue}>4 Cryptocurrencies</ThemedText>
            </View>
          </View>
        </View>

        {/* Verification */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Verification</ThemedText>

          <View style={styles.verificationCard}>
            <View style={styles.verificationRow}>
              <View style={styles.verificationCheck}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
              </View>
              <View style={styles.verificationInfo}>
                <ThemedText style={styles.verificationTitle}>Email Verified</ThemedText>
                <ThemedText style={styles.verificationDesc}>Your email has been verified</ThemedText>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.verificationRow}>
              <View style={styles.verificationCheck}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
              </View>
              <View style={styles.verificationInfo}>
                <ThemedText style={styles.verificationTitle}>2FA Enabled</ThemedText>
                <ThemedText style={styles.verificationDesc}>Two-factor authentication is active</ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={18} color="#FFFFFF" />
          <ThemedText style={styles.editButtonText}>Edit Profile</ThemedText>
        </TouchableOpacity>
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
  avatarSection: {
    alignItems: "center",
    marginBottom: 32,
    paddingVertical: 20,
  },
  largeAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  largeInitial: {
    fontSize: 48,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#9CA3AF",
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
  infoCard: {
    backgroundColor: "#111827",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1F2937",
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  infoLabel: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#1F2937",
  },
  statusBadge: {
    backgroundColor: "#064E3B",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    color: "#10B981",
    fontWeight: "600",
  },
  summaryCard: {
    backgroundColor: "#111827",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1F2937",
    overflow: "hidden",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  verificationCard: {
    backgroundColor: "#111827",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1F2937",
    overflow: "hidden",
  },
  verificationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  verificationCheck: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#064E3B",
    justifyContent: "center",
    alignItems: "center",
  },
  verificationInfo: {
    flex: 1,
  },
  verificationTitle: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: 2,
  },
  verificationDesc: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8B5CF6",
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    marginTop: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
})
