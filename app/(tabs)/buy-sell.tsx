"use client"

import { ThemedText } from "@/components/ThemedText"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

/**
 * Buy/Sell screen
 * Central action screen for buying and selling crypto
 */
export default function BuySellScreen() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy")

  const cryptoAssets = [
    { symbol: "BTC", name: "Bitcoin", price: "$27,642.01", change: "+2.5%" },
    { symbol: "ETH", name: "Ethereum", price: "$1,666.36", change: "+1.2%" },
    { symbol: "LTC", name: "Litecoin", price: "$92.45", change: "-0.8%" },
    { symbol: "XRP", name: "Ripple", price: "$2.45", change: "+3.1%" },
  ]

  const handleAction = (action: "buy" | "sell", asset: string) => {
    Alert.alert(`${action.toUpperCase()} ${asset}`, `Proceeding to ${action} ${asset}...`)
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.background}>
        <LinearGradient colors={["#000000", "#0a0a0a", "#000000"]} style={styles.gradient} />
      </View>

      <View style={styles.header}>
        <ThemedText style={styles.title}>Buy / Sell</ThemedText>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabSelector}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "buy" && styles.tabActive]}
          onPress={() => setActiveTab("buy")}
        >
          <Ionicons name="arrow-down" size={20} color={activeTab === "buy" ? "#10B981" : "#9CA3AF"} />
          <ThemedText style={[styles.tabText, activeTab === "buy" && styles.tabTextActive]}>Buy</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "sell" && styles.tabActive]}
          onPress={() => setActiveTab("sell")}
        >
          <Ionicons name="arrow-up" size={20} color={activeTab === "sell" ? "#EF4444" : "#9CA3AF"} />
          <ThemedText style={[styles.tabText, activeTab === "sell" && styles.tabTextActive]}>Sell</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {cryptoAssets.map((asset) => (
          <View key={asset.symbol} style={styles.assetCard}>
            <View style={styles.assetLeft}>
              <View style={styles.assetIcon}>
                <ThemedText style={styles.assetIconText}>{asset.symbol[0]}</ThemedText>
              </View>
              <View style={styles.assetInfo}>
                <ThemedText style={styles.assetName}>{asset.name}</ThemedText>
                <ThemedText style={styles.assetSymbol}>{asset.symbol}</ThemedText>
              </View>
            </View>

            <View style={styles.assetRight}>
              <View style={styles.assetPriceInfo}>
                <ThemedText style={styles.assetPrice}>{asset.price}</ThemedText>
                <ThemedText
                  style={[styles.assetChange, { color: asset.change.startsWith("+") ? "#10B981" : "#EF4444" }]}
                >
                  {asset.change}
                </ThemedText>
              </View>
              <TouchableOpacity
                style={[styles.actionButton, activeTab === "buy" ? styles.buyButton : styles.sellButton]}
                onPress={() => handleAction(activeTab, asset.symbol)}
              >
                <ThemedText style={styles.actionButtonText}>{activeTab === "buy" ? "Buy" : "Sell"}</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  tabSelector: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#1F2937",
    gap: 8,
  },
  tabActive: {
    backgroundColor: "#1F2937",
    borderColor: "#374151",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  assetCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#111827",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1F2937",
  },
  assetLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  assetIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#1F2937",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  assetIconText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  assetSymbol: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  assetRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  assetPriceInfo: {
    alignItems: "flex-end",
  },
  assetPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  assetChange: {
    fontSize: 12,
    fontWeight: "500",
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buyButton: {
    backgroundColor: "#10B981",
  },
  sellButton: {
    backgroundColor: "#EF4444",
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
})
