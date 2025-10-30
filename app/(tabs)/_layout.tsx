"use client"

import { Tabs } from "expo-router"
import { HapticTab } from "@/components/HapticTab"
import { IconSymbol } from "@/components/ui/IconSymbol"
import TabBarBackground from "@/components/ui/TabBarBackground"
import { Colors } from "@/constants/Colors"
import { useColorScheme } from "@/hooks/useColorScheme"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Modal, TouchableOpacity, View } from "react-native"
import { useRouter } from "expo-router"
import { ThemedText } from "@/components/ThemedText"

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const router = useRouter()
  const [showBuySellModal, setShowBuySellModal] = useState(false)

  const handleBuyPress = () => {
    setShowBuySellModal(false)
    router.push("/(tabs)/buy-sell" as any)
  }

  const handleSellPress = () => {
    setShowBuySellModal(false)
    router.push("/(tabs)/buy-sell" as any)
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
        }}
      >
        {/* Home Tab */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />

        {/* Transactions Tab */}
        <Tabs.Screen
          name="transactions"
          options={{
            title: "Transactions",
            tabBarIcon: ({ color }) => <Ionicons name="swap-horizontal" size={28} color={color} />,
          }}
        />

        <Tabs.Screen
          name="buy-sell"
          options={{
            title: "Buy/Sell",
            tabBarIcon: ({ color }) => (
              <TouchableOpacity
                onPress={() => setShowBuySellModal(true)}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: "#8B5CF6",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                  shadowColor: "#8B5CF6",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Ionicons name="add" size={32} color="#FFFFFF" />
              </TouchableOpacity>
            ),
          }}
        />

        {/* Holdings Tab */}
        <Tabs.Screen
          name="holdings"
          options={{
            title: "Holdings",
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.bar.fill" color={color} />,
          }}
        />

        {/* Wallet Tab */}
        <Tabs.Screen
          name="wallet"
          options={{
            title: "Wallet",
            tabBarIcon: ({ color }) => <Ionicons name="wallet" size={28} color={color} />,
          }}
        />
      </Tabs>

      <Modal visible={showBuySellModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.7)", justifyContent: "flex-end" }}>
          <View
            style={{
              backgroundColor: "#111827",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 40,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}
            >
              <ThemedText style={{ fontSize: 20, fontWeight: "700", color: "#FFFFFF" }}>Quick Action</ThemedText>
              <TouchableOpacity onPress={() => setShowBuySellModal(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={{ gap: 12 }}>
              <TouchableOpacity
                onPress={handleBuyPress}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#1F2937",
                  borderRadius: 12,
                  padding: 16,
                  gap: 16,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: "#8B5CF6",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="arrow-down" size={24} color="#FFFFFF" />
                </View>
                <View>
                  <ThemedText style={{ fontSize: 16, fontWeight: "600", color: "#FFFFFF", marginBottom: 4 }}>
                    Buy Crypto
                  </ThemedText>
                  <ThemedText style={{ fontSize: 13, color: "#9CA3AF" }}>Purchase cryptocurrencies</ThemedText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSellPress}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#1F2937",
                  borderRadius: 12,
                  padding: 16,
                  gap: 16,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: "#8B5CF6",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="arrow-up" size={24} color="#FFFFFF" />
                </View>
                <View>
                  <ThemedText style={{ fontSize: 16, fontWeight: "600", color: "#FFFFFF", marginBottom: 4 }}>
                    Sell Crypto
                  </ThemedText>
                  <ThemedText style={{ fontSize: 13, color: "#9CA3AF" }}>Sell your holdings</ThemedText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
