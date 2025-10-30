import { ThemedText } from "@/components/ThemedText"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

/**
 * Wallet screen
 * Displays wallet addresses and management options
 */
export default function WalletScreen() {
  const insets = useSafeAreaInsets()
  const wallets = [
    {
      id: 1,
      name: "Main Wallet",
      address: "0x742d35Cc6634C0532925a3b844Bc9e7595f42e...",
      balance: "$87,412.50",
      coins: "BTC, ETH, LTC",
    },
    {
      id: 2,
      name: "Trading Wallet",
      address: "0x8ba1f109551bD432803012645Ac136ddd64DBA...",
      balance: "$12,345.00",
      coins: "ETH, XRP",
    },
    {
      id: 3,
      name: "Savings Wallet",
      address: "0x1234567890abcdef1234567890abcdef12345678...",
      balance: "$45,678.90",
      coins: "BTC",
    },
  ]

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.background}>
        <LinearGradient colors={["#000000", "#0a0a0a", "#000000"]} style={styles.gradient} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <ThemedText style={styles.title}>Wallets</ThemedText>
        </View>

        {wallets.map((wallet) => (
          <View key={wallet.id} style={styles.walletCard}>
            <View style={styles.walletHeader}>
              <View style={styles.walletIconContainer}>
                <Ionicons name="wallet" size={24} color="#8B5CF6" />
              </View>
              <View style={styles.walletInfo}>
                <ThemedText style={styles.walletName}>{wallet.name}</ThemedText>
                <ThemedText style={styles.walletAddress}>{wallet.address}</ThemedText>
              </View>
            </View>

            <View style={styles.walletDivider} />

            <View style={styles.walletFooter}>
              <View>
                <ThemedText style={styles.balanceLabel}>Balance</ThemedText>
                <ThemedText style={styles.balanceAmount}>{wallet.balance}</ThemedText>
              </View>
              <View style={styles.walletActions}>
                <TouchableOpacity style={styles.actionIcon}>
                  <Ionicons name="copy" size={20} color="#8B5CF6" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIcon}>
                  <Ionicons name="arrow-forward" size={20} color="#8B5CF6" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.coinsContainer}>
              <ThemedText style={styles.coinsLabel}>Assets: {wallet.coins}</ThemedText>
            </View>
          </View>
        ))}

        {/* Add Wallet Button */}
        <TouchableOpacity style={styles.addWalletButton}>
          <Ionicons name="add-circle-outline" size={24} color="#8B5CF6" />
          <ThemedText style={styles.addWalletText}>Add New Wallet</ThemedText>
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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
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
  walletCard: {
    backgroundColor: "#111827",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1F2937",
    padding: 16,
    marginBottom: 16,
  },
  walletHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  walletIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#1F2937",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  walletAddress: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  walletDivider: {
    height: 1,
    backgroundColor: "#1F2937",
    marginVertical: 12,
  },
  walletFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  walletActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#1F2937",
    justifyContent: "center",
    alignItems: "center",
  },
  coinsContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#1F2937",
  },
  coinsLabel: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  addWalletButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#8B5CF6",
    borderStyle: "dashed",
    marginBottom: 40,
    gap: 8,
  },
  addWalletText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8B5CF6",
  },
})
