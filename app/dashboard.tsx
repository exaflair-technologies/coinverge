"use client"

import { ThemedText } from "@/components/ThemedText"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { Dimensions, Modal, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { supabase } from "../lib/supabase"

const { width, height } = Dimensions.get("window")

type IoniconName = keyof typeof Ionicons.glyphMap
type CryptoItem = { symbol: string; name: string; price: string; change: string; icon: IoniconName }

/**
 * Dashboard screen component
 * Displays user's crypto portfolio with balance, holdings, and actions
 */
export default function DashboardScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [userInitial, setUserInitial] = useState("N")
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showBuySellModal, setShowBuySellModal] = useState(false)
  const [activeTab, setActiveTab] = useState("popular")
  const profileMenuRef = useRef(null)

  useEffect(() => {
    const fetchUserInitial = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user?.email) {
        setUserInitial(user.email[0].toUpperCase())
      }
    }
    fetchUserInitial()
    const { data: subscription } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        router.replace("/")
      }
    })
    return () => subscription.subscription?.unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      // onAuthStateChange will handle navigation; add fallback just in case
      router.replace("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleProfilePress = () => {
    setShowProfileMenu(false)
    router.push("/profile" as any)
  }

  const handleSettingsPress = () => {
    setShowProfileMenu(false)
    router.push("/settings" as any)
  }

  const handleBuyPress = () => {
    setShowBuySellModal(false)
    router.push("/buy-sell" as any)
  }

  const handleSellPress = () => {
    setShowBuySellModal(false)
    router.push("/buy-sell" as any)
  }

  const handleSeeAll = () => {
    router.push("/holdings" as any)
  }

  const popularCryptos: CryptoItem[] = [
    { symbol: "BTC", name: "Bitcoin", price: "$28,450.00", change: "+2.5%", icon: "logo-bitcoin" },
    { symbol: "ETH", name: "Ethereum", price: "$1,850.00", change: "+1.8%", icon: "logo-electron" },
    { symbol: "SOL", name: "Solana", price: "$142.50", change: "+5.2%", icon: "logo-usd" },
    { symbol: "ADA", name: "Cardano", price: "$0.98", change: "+3.1%", icon: "logo-usd" },
  ]

  const biggestMovers: CryptoItem[] = [
    { symbol: "DOGE", name: "Dogecoin", price: "$0.42", change: "+12.5%", icon: "logo-usd" },
    { symbol: "SHIB", name: "Shiba Inu", price: "$0.000018", change: "+8.3%", icon: "logo-usd" },
    { symbol: "PEPE", name: "Pepe", price: "$0.0000089", change: "+15.7%", icon: "logo-usd" },
    { symbol: "FLOKI", name: "Floki", price: "$0.000156", change: "+9.2%", icon: "logo-usd" },
  ]

  const displayedCryptos = activeTab === "popular" ? popularCryptos : biggestMovers

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={styles.background}>
        <LinearGradient colors={["#000000", "#0a0a0a", "#000000"]} style={styles.gradient} />
      </View>

      <ScrollView
        style={styles.pageContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: Math.max(8, insets.top + 4) }]}
      >
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Portfolio</ThemedText>

          <View style={styles.profileMenuContainer}>
            <TouchableOpacity style={styles.profileButton} onPress={() => setShowProfileMenu(!showProfileMenu)}>
              <View style={styles.profileAvatar}>
                <ThemedText style={styles.profileInitial}>{userInitial}</ThemedText>
              </View>
            </TouchableOpacity>

            {showProfileMenu && (
              <View style={styles.profileDropdown}>
                <TouchableOpacity style={styles.menuItem} onPress={handleProfilePress}>
                  <Ionicons name="person" size={18} color="#FFFFFF" />
                  <ThemedText style={styles.menuItemText}>Profile</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={handleSettingsPress}>
                  <Ionicons name="settings" size={18} color="#FFFFFF" />
                  <ThemedText style={styles.menuItemText}>Settings</ThemedText>
                </TouchableOpacity>
                <View style={styles.menuDivider} />
                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                  <Ionicons name="log-out" size={18} color="#EF4444" />
                  <ThemedText style={[styles.menuItemText, { color: "#EF4444" }]}>Logout</ThemedText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Current Balance Card - gradient (pink/purple) */}
        <View style={styles.balanceCard}>
          <LinearGradient
            colors={["#8B5CF6", "#EC4899"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.balanceGradient}
          >
            <ThemedText style={styles.balanceLabel}>MAIN PORTFOLIO</ThemedText>
            <View style={styles.balanceRow}>
              <View style={styles.balanceLeft}>
                <ThemedText style={styles.balanceAmount}>$87,412.50</ThemedText>
                <ThemedText style={styles.balanceSubtext}>Total Balance</ThemedText>
              </View>
              <View style={styles.balanceChange}>
                <Ionicons name="trending-up" size={16} color="#10B981" />
                <ThemedText style={styles.changeText}>+10.2%</ThemedText>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Quick actions: Sell / Buy / Receive / Earn */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, styles.sellButton]} onPress={() => handleAction("Sell")}>
            <Ionicons name="arrow-up" size={20} color="#FFFFFF" />
            <ThemedText style={styles.sellButtonText}>Sell</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]} onPress={() => handleAction("Buy")}>
            <Ionicons name="arrow-down" size={20} color="#FFFFFF" />
            <ThemedText style={styles.secondaryButtonText}>Buy</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => handleAction("Receive")}
          >
            <Ionicons name="download" size={20} color="#FFFFFF" />
            <ThemedText style={styles.secondaryButtonText}>Receive</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]} onPress={() => handleAction("Earn")}>
            <Ionicons name="star" size={20} color="#FFFFFF" />
            <ThemedText style={styles.secondaryButtonText}>Earn</ThemedText>
          </TouchableOpacity>
        </View>

        {/* MY FUNDS + Most popular tabs */}
        <View style={styles.myFundsHeaderRow}>
          <ThemedText style={styles.sectionTitle}>MY FUNDS</ThemedText>
          <TouchableOpacity onPress={handleSeeAll}>
            <ThemedText style={styles.seeAllText}>View all</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Horizontal sliding cards (My Funds) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.fundsCarousel}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={width * 0.72}
        >
          {/* Bitcoin card */}
          <TouchableOpacity
            style={styles.fundCard}
            onPress={() =>
              router.push({
                pathname: "/trading/[symbol]" as any,
                params: { symbol: "BTC", name: "Bitcoin", price: "27642.01", qty: "2.05" },
              })
            }
          >
            <View style={styles.fundHeaderRow}>
              <Ionicons name="logo-bitcoin" size={16} color="#F59E0B" />
              <ThemedText style={styles.fundTitle}>Bitcoin</ThemedText>
              <ThemedText style={styles.fundCode}>BTC</ThemedText>
            </View>
            <LinearGradient colors={["#10B98133", "#10B98108"]} style={styles.fundMiniChartGreen} />
            <View style={styles.fundFooterRow}>
              <ThemedText style={styles.fundPrice}>$27,642.01</ThemedText>
              <ThemedText style={styles.fundChangeGreen}>+2,812 • +0.97%</ThemedText>
            </View>
          </TouchableOpacity>
          {/* Ethereum card */}
          <TouchableOpacity
            style={styles.fundCard}
            onPress={() =>
              router.push({
                pathname: "/trading/[symbol]" as any,
                params: { symbol: "ETH", name: "Ethereum", price: "1666.36", qty: "50" },
              })
            }
          >
            <View style={styles.fundHeaderRow}>
              <Ionicons name="logo-electron" size={16} color="#627EEA" />
              <ThemedText style={styles.fundTitle}>Ethereum</ThemedText>
              <ThemedText style={styles.fundCode}>ETH</ThemedText>
            </View>
            <LinearGradient colors={["#3B82F633", "#3B82F608"]} style={styles.fundMiniChartGreen} />
            <View style={styles.fundFooterRow}>
              <ThemedText style={styles.fundPrice}>$1,666.36</ThemedText>
              <ThemedText style={styles.fundChangeGreen}>+0.016 • +0.01%</ThemedText>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.segmentsRow}>
          <TouchableOpacity
            style={[styles.segment, activeTab === "popular" && styles.segmentActive]}
            onPress={() => setActiveTab("popular")}
          >
            <ThemedText style={activeTab === "popular" ? styles.segmentActiveText : styles.segmentText}>
              Most popular
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segment, activeTab === "movers" && styles.segmentActive]}
            onPress={() => setActiveTab("movers")}
          >
            <ThemedText style={activeTab === "movers" ? styles.segmentActiveText : styles.segmentText}>
              Biggest movers
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.segment}>
            <ThemedText style={styles.segmentText}>Recommend</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Holdings list - Popular or Biggest Movers */}
        <View style={styles.holdingsSection}>
          <View style={styles.holdingsList}>
            {displayedCryptos.map((crypto, index) => (
              <TouchableOpacity key={index} style={styles.holdingItem}>
                <View style={styles.holdingLeft}>
                  <View style={styles.cryptoIcon}>
                    <Ionicons name={crypto.icon} size={20} color="#FFFFFF" />
                  </View>
                  <View style={styles.cryptoInfo}>
                    <ThemedText style={styles.cryptoName}>{crypto.name}</ThemedText>
                    <ThemedText style={styles.cryptoCode}>{crypto.symbol}</ThemedText>
                  </View>
                </View>
                <View style={styles.holdingRight}>
                  <View style={styles.chartContainer}>
                    <View style={[styles.chartLine, styles.greenLine]} />
                  </View>
                  <View style={styles.holdingValues}>
                    <ThemedText style={styles.holdingValue}>{crypto.price}</ThemedText>
                    <ThemedText style={[styles.holdingQuantity, { color: "#10B981" }]}>{crypto.change}</ThemedText>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal visible={showBuySellModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Quick Action</ThemedText>
              <TouchableOpacity onPress={() => setShowBuySellModal(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleBuyPress}>
                <View style={styles.modalButtonIcon}>
                  <Ionicons name="arrow-down" size={24} color="#FFFFFF" />
                </View>
                <View>
                  <ThemedText style={styles.modalButtonTitle}>Buy Crypto</ThemedText>
                  <ThemedText style={styles.modalButtonSubtitle}>Purchase cryptocurrencies</ThemedText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton} onPress={handleSellPress}>
                <View style={styles.modalButtonIcon}>
                  <Ionicons name="arrow-up" size={24} color="#FFFFFF" />
                </View>
                <View>
                  <ThemedText style={styles.modalButtonTitle}>Sell Crypto</ThemedText>
                  <ThemedText style={styles.modalButtonSubtitle}>Sell your holdings</ThemedText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )

  function handleAction(action: string) {
    console.log(`${action} pressed`)
  }
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
  pageContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  profileMenuContainer: {
    position: "relative",
  },
  profileButton: {
    padding: 4,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  profileDropdown: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: "#111827",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1F2937",
    minWidth: 160,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#1F2937",
    marginVertical: 4,
  },
  balanceCard: {
    marginHorizontal: 20,
    marginTop: 0,
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  balanceGradient: {
    padding: 24,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
    marginBottom: 12,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceLeft: {
    flex: 1,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
    lineHeight: 40,
  },
  balanceSubtext: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.7,
  },
  balanceChange: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  changeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10B981",
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  sellButton: {
    backgroundColor: "#8B5CF6",
  },
  sellButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#333333",
  },
  secondaryButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  myFundsHeaderRow: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { color: "#9CA3AF", fontSize: 12, fontWeight: "600" },
  fundsCarousel: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  fundCard: {
    width: width * 0.68,
    marginRight: 12,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#1F2937",
    borderRadius: 16,
    padding: 12,
    height: 140,
  },
  fundHeaderRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  fundTitle: { color: "#F3F4F6", fontWeight: "700", fontSize: 14 },
  fundCode: { color: "#9CA3AF", marginLeft: 4, fontSize: 11 },
  fundMiniChartGreen: { height: 40, borderRadius: 6, marginBottom: 8 },
  fundFooterRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  fundPrice: { color: "#E5E7EB", fontWeight: "700", fontSize: 14 },
  fundChangeGreen: { color: "#10B981", fontSize: 11 },
  segmentsRow: {
    marginBottom: 16,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
  },
  segment: {
    flex: 1,
    backgroundColor: "#1F2937",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#374151",
  },
  segmentActive: { backgroundColor: "#8B5CF6", borderColor: "#8B5CF6" },
  segmentText: { color: "#9CA3AF", fontSize: 12, fontWeight: "500" },
  segmentActiveText: { color: "#FFFFFF", fontWeight: "700", fontSize: 12 },
  holdingsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  holdingsList: {
    gap: 16,
  },
  holdingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  holdingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cryptoIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cryptoIconText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cryptoInfo: {
    flex: 1,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  cryptoCode: {
    fontSize: 14,
    color: "#CCCCCC",
  },
  holdingRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  chartContainer: {
    width: 40,
    height: 20,
    marginRight: 12,
    justifyContent: "center",
  },
  chartLine: {
    height: 2,
    borderRadius: 1,
  },
  greenLine: {
    backgroundColor: "#10B981",
  },
  orangeLine: {
    backgroundColor: "#FF8C00",
  },
  holdingValues: {
    alignItems: "flex-end",
  },
  holdingValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  holdingQuantity: {
    fontSize: 14,
    color: "#CCCCCC",
  },
  seeAllText: {
    fontSize: 14,
    color: "#CCCCCC",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#111827",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  modalButtonsContainer: {
    gap: 12,
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  modalButtonIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  modalButtonSubtitle: {
    fontSize: 13,
    color: "#9CA3AF",
  },
})
