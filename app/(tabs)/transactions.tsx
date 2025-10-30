import { ThemedText } from "@/components/ThemedText"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { ScrollView, StyleSheet, View } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

/**
 * Transactions screen
 * Displays user's transaction history
 */
export default function TransactionsScreen() {
  const insets = useSafeAreaInsets()
  const transactions = [
    {
      id: 1,
      type: "buy",
      asset: "Bitcoin",
      amount: "+2.05 BTC",
      value: "+$56,234.10",
      date: "Today",
      time: "2:30 PM",
      status: "completed",
    },
    {
      id: 2,
      type: "sell",
      asset: "Ethereum",
      amount: "-10 ETH",
      value: "-$16,663.60",
      date: "Yesterday",
      time: "11:45 AM",
      status: "completed",
    },
    {
      id: 3,
      type: "receive",
      asset: "Bitcoin",
      amount: "+0.5 BTC",
      value: "+$13,821.00",
      date: "2 days ago",
      time: "5:15 PM",
      status: "completed",
    },
    {
      id: 4,
      type: "send",
      asset: "Ethereum",
      amount: "-5 ETH",
      value: "-$8,331.80",
      date: "3 days ago",
      time: "9:20 AM",
      status: "completed",
    },
    {
      id: 5,
      type: "buy",
      asset: "Litecoin",
      amount: "+10 LTC",
      value: "+$1,234.50",
      date: "1 week ago",
      time: "3:00 PM",
      status: "completed",
    },
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "buy":
        return "arrow-down-circle"
      case "sell":
        return "arrow-up-circle"
      case "receive":
        return "arrow-down-circle"
      case "send":
        return "arrow-up-circle"
      default:
        return "swap-horizontal"
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "buy":
      case "receive":
        return "#10B981"
      case "sell":
      case "send":
        return "#EF4444"
      default:
        return "#8B5CF6"
    }
  }

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
          <ThemedText style={styles.title}>Transactions</ThemedText>
        </View>

        {transactions.map((tx) => (
          <View key={tx.id} style={styles.transactionItem}>
            <View style={[styles.iconContainer, { backgroundColor: getTransactionColor(tx.type) + "20" }]}>
              <Ionicons name={getTransactionIcon(tx.type)} size={24} color={getTransactionColor(tx.type)} />
            </View>

            <View style={styles.transactionInfo}>
              <ThemedText style={styles.assetName}>{tx.asset}</ThemedText>
              <ThemedText style={styles.transactionDate}>
                {tx.date} at {tx.time}
              </ThemedText>
            </View>

            <View style={styles.transactionValues}>
              <ThemedText style={[styles.amount, { color: getTransactionColor(tx.type) }]}>{tx.amount}</ThemedText>
              <ThemedText style={[styles.value, { color: getTransactionColor(tx.type) }]}>{tx.value}</ThemedText>
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
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1F2937",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  transactionInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  transactionValues: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  value: {
    fontSize: 12,
    fontWeight: "500",
  },
})
