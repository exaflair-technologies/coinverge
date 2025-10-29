// To-Do: Fix the padding of the segments row and the padding of the holdings section.

import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Dimensions, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';

const { width, height } = Dimensions.get('window');

/**
 * Dashboard screen component
 * Displays user's crypto portfolio with balance, holdings, and actions
 */
export default function DashboardScreen() {
  const router = useRouter();

  /**
   * Handle back navigation
   */
  const handleBack = () => {
    router.back();
  };

  /**
   * Handle logout action
   * Signs out the user quickly and navigates to auth page
   */
  const handleLogout = async () => {
    // Navigate immediately for faster UX, sign out in background
    router.replace('/auth');
    
    // Sign out in background without blocking navigation
    supabase.auth.signOut().catch((error) => {
      console.error('Logout error:', error);
    });
  };

  /**
   * Handle action buttons
   */
  const handleAction = (action: string) => {
    console.log(`${action} pressed`);
    // TODO: Implement action logic
  };

  /**
   * Handle see all holdings
   */
  const handleSeeAll = () => {
    // Navigate to holdings list screen (cast for typed routes until types update)
    router.push('/holdings' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Background with gradient overlay */}
      <View style={styles.background}>
        <LinearGradient
          colors={['#000000', '#0a0a0a', '#000000']}
          style={styles.gradient}
        />
      </View>

      <View style={styles.pageContainer}>
        {/* Fixed block: header + portfolio + quick actions + my funds + tabs */}
        <View>
          {/* Header Section */}
          <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.profileSection}>
            <View style={styles.profileImage}>
              <Ionicons name="person" size={24} color="#FFFFFF" />
            </View>
            <ThemedText style={styles.greeting}>Hello Nitin</ThemedText>
          </View>
          
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          </View>

          {/* Current Balance Card - gradient (pink/purple) */}
          <View style={styles.balanceCard}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.balanceGradient}
            >
              <ThemedText style={styles.balanceLabel}>MAIN PORTFOLIO</ThemedText>
              <View style={styles.balanceRow}>
                <ThemedText style={styles.balanceAmount}>$87,4.12</ThemedText>
                <View style={styles.balanceChange}>
                  <Ionicons name="trending-up" size={16} color="#10B981" />
                  <ThemedText style={styles.changeText}>10.2%</ThemedText>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Quick actions: Sell / Buy / Receive / Earn */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.sellButton]}
              onPress={() => handleAction('Sell')}
            >
              <ThemedText style={styles.sellButtonText}>Sell</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => handleAction('Buy')}
            >
              <ThemedText style={styles.secondaryButtonText}>Buy</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => handleAction('Receive')}
            >
              <ThemedText style={styles.secondaryButtonText}>Receive</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => handleAction('Earn')}
            >
              <ThemedText style={styles.secondaryButtonText}>Earn</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons removed for iPhone style */}

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
          <TouchableOpacity style={styles.fundCard} onPress={() => router.push({ pathname: '/trading/[symbol]' as any, params: { symbol: 'BTC', name: 'Bitcoin', price: '27642.01', qty: '2.05' } })}>
            <View style={styles.fundHeaderRow}>
              <Ionicons name="logo-bitcoin" size={16} color="#ffffff" />
              <ThemedText style={styles.fundTitle}>Bitcoin</ThemedText>
              <ThemedText style={styles.fundCode}>BTC</ThemedText>
            </View>
            <View style={styles.fundMiniChartGreen} />
            <View style={styles.fundFooterRow}>
              <ThemedText style={styles.fundPrice}>$27,642.01</ThemedText>
              <ThemedText style={styles.fundChangeGreen}>+2,812 • +0.97%</ThemedText>
            </View>
          </TouchableOpacity>
          {/* Ethereum card */}
          <TouchableOpacity style={styles.fundCard} onPress={() => router.push({ pathname: '/trading/[symbol]' as any, params: { symbol: 'ETH', name: 'Ethereum', price: '1666.36', qty: '50' } })}>
            <View style={styles.fundHeaderRow}>
              <Ionicons name="logo-electron" size={16} color="#ffffff" />
              <ThemedText style={styles.fundTitle}>Ethereum</ThemedText>
              <ThemedText style={styles.fundCode}>ETH</ThemedText>
            </View>
            <View style={styles.fundMiniChartGreen} />
            <View style={styles.fundFooterRow}>
              <ThemedText style={styles.fundPrice}>$1,666.36</ThemedText>
              <ThemedText style={styles.fundChangeGreen}>+0.016 • +0.01%</ThemedText>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.segmentsRow}>
          <TouchableOpacity style={[styles.segment, styles.segmentActive]}>
            <ThemedText style={styles.segmentActiveText}>Most popular</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.segment}>
            <ThemedText style={styles.segmentText}>Biggest movers</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.segment}>
            <ThemedText style={styles.segmentText}>Recommend</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Scrollable list only (Most popular / Biggest movers / Recommend) */}
        <ScrollView style={styles.listScroll} showsVerticalScrollIndicator={false}>
          <View style={[styles.holdingsSection, { paddingTop: 8 }]}>
            <View style={styles.holdingsList}>
            {/* Ethereum */}
            <TouchableOpacity 
              style={styles.holdingItem}
              onPress={() => router.push({ pathname: '/trading/[symbol]' as any, params: { symbol: 'ETH', name: 'Ethereum', price: '503.12', qty: '50' } })}
            >
              <View style={styles.holdingLeft}>
                <View style={styles.cryptoIcon}>
                  <ThemedText style={styles.cryptoIconText}>Ξ</ThemedText>
                </View>
                <View style={styles.cryptoInfo}>
                  <ThemedText style={styles.cryptoName}>Ethereum</ThemedText>
                  <ThemedText style={styles.cryptoCode}>ETH</ThemedText>
                </View>
              </View>
              <View style={styles.holdingRight}>
                <View style={styles.chartContainer}>
                  <View style={[styles.chartLine, styles.greenLine]} />
                </View>
                <View style={styles.holdingValues}>
                  <ThemedText style={styles.holdingValue}>$503.12</ThemedText>
                  <ThemedText style={styles.holdingQuantity}>50 ETH</ThemedText>
                </View>
              </View>
            </TouchableOpacity>

            {/* Bitcoin */}
            <TouchableOpacity 
              style={styles.holdingItem}
              onPress={() => router.push({ pathname: '/trading/[symbol]' as any, params: { symbol: 'BTC', name: 'Bitcoin', price: '26927', qty: '2.05' } })}
            >
              <View style={styles.holdingLeft}>
                <View style={styles.cryptoIcon}>
                  <ThemedText style={styles.cryptoIconText}>₿</ThemedText>
                </View>
                <View style={styles.cryptoInfo}>
                  <ThemedText style={styles.cryptoName}>Bitcoin</ThemedText>
                  <ThemedText style={styles.cryptoCode}>BTC</ThemedText>
                </View>
              </View>
              <View style={styles.holdingRight}>
                <View style={styles.chartContainer}>
                  <View style={[styles.chartLine, styles.orangeLine]} />
                </View>
                <View style={styles.holdingValues}>
                  <ThemedText style={styles.holdingValue}>$26927</ThemedText>
                  <ThemedText style={styles.holdingQuantity}>2.05 BTC</ThemedText>
                </View>
              </View>
            </TouchableOpacity>

            {/* Litecoin */}
            <TouchableOpacity 
              style={styles.holdingItem}
              onPress={() => router.push({ pathname: '/trading/[symbol]' as any, params: { symbol: 'LTC', name: 'Litecoin', price: '6927', qty: '2.05' } })}
            >
              <View style={styles.holdingLeft}>
                <View style={styles.cryptoIcon}>
                  <ThemedText style={styles.cryptoIconText}>Ł</ThemedText>
                </View>
                <View style={styles.cryptoInfo}>
                  <ThemedText style={styles.cryptoName}>Litecoin</ThemedText>
                  <ThemedText style={styles.cryptoCode}>LTC</ThemedText>
                </View>
              </View>
              <View style={styles.holdingRight}>
                <View style={styles.chartContainer}>
                  <View style={[styles.chartLine, styles.greenLine]} />
                </View>
                <View style={styles.holdingValues}>
                  <ThemedText style={styles.holdingValue}>$6927</ThemedText>
                  <ThemedText style={styles.holdingQuantity}>2.05 LTC</ThemedText>
                </View>
              </View>
            </TouchableOpacity>

            {/* Ripple */}
            <TouchableOpacity 
              style={styles.holdingItem}
              onPress={() => router.push({ pathname: '/trading/[symbol]' as any, params: { symbol: 'XRP', name: 'Ripple', price: '4637', qty: '2.05' } })}
            >
              <View style={styles.holdingLeft}>
                <View style={styles.cryptoIcon}>
                  <ThemedText style={styles.cryptoIconText}>X</ThemedText>
                </View>
                <View style={styles.cryptoInfo}>
                  <ThemedText style={styles.cryptoName}>Ripple</ThemedText>
                  <ThemedText style={styles.cryptoCode}>XRP</ThemedText>
                </View>
              </View>
              <View style={styles.holdingRight}>
                <View style={styles.chartContainer}>
                  <View style={[styles.chartLine, styles.greenLine]} />
                </View>
                <View style={styles.holdingValues}>
                  <ThemedText style={styles.holdingValue}>$4637</ThemedText>
                  <ThemedText style={styles.holdingQuantity}>2.05 XRP</ThemedText>
                </View>
              </View>
            </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
  },
  stickyContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 6,
  },
  listScroll: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  logoutButton: {
    padding: 8,
  },
  topRow: {
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1F2937' },
  welcomeLabel: { color: '#E5E7EB', fontWeight: '700' },
  emailLabel: { color: '#9CA3AF', fontSize: 12 },
  bellButton: { padding: 8 },
  illustrationContainer: {
    position: 'absolute',
    top: 80,
    right: -50,
    width: 200,
    height: 150,
    zIndex: 1,
  },
  personIllustration: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 60,
    height: 80,
  },
  personHead: {
    width: 20,
    height: 20,
    backgroundColor: '#FF8C00',
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 20,
  },
  personBody: {
    width: 30,
    height: 40,
    backgroundColor: '#FF8C00',
    borderRadius: 15,
    position: 'absolute',
    top: 15,
    left: 15,
  },
  laptop: {
    width: 25,
    height: 15,
    backgroundColor: '#87CEEB',
    borderRadius: 3,
    position: 'absolute',
    top: 35,
    left: 10,
  },
  floatingCoin: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  coinText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  coin1: {
    top: 10,
    right: 60,
  },
  coin2: {
    top: 40,
    right: 30,
  },
  coin3: {
    top: 70,
    right: 50,
  },
  connectionLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#10B981',
  },
  line1: {
    width: 30,
    top: 20,
    right: 40,
    backgroundColor: '#10B981',
  },
  line2: {
    width: 25,
    top: 50,
    right: 20,
    backgroundColor: '#FF8C00',
  },
  line3: {
    width: 20,
    top: 80,
    right: 30,
    backgroundColor: '#8B5CF6',
  },
  balanceCard: {
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  balanceCardDark: {
    marginHorizontal: 20,
    marginTop: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
    backgroundColor: '#111827',
  },
  balanceDarkBody: { padding: 16 },
  balanceLabelDark: { fontSize: 12, color: '#9CA3AF', marginBottom: 6 },
  balanceAmountDark: { fontSize: 28, fontWeight: '800', color: '#F9FAFB' },
  balanceHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceChangeCol: { alignItems: 'flex-end' },
  profitAmount: { color: '#10B981', fontWeight: '700' },
  profitPercent: { color: '#10B981', fontSize: 12 },
  balanceActionsRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  primaryPill: { backgroundColor: '#1F2937', borderWidth: 1, borderColor: '#374151' },
  secondaryPill: { backgroundColor: '#F3F4F6' },
  pillText: { color: '#E5E7EB', fontWeight: '600', fontSize: 12 },
  pillTextDark: { color: '#111827', fontWeight: '700', fontSize: 12 },
  balanceGradient: {
    padding: 24,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  balanceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 0,
    borderRadius: 12,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myFundsHeaderRow: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 0, // Reduce top margin to tighten MY FUNDS header vertical space
  },
  sectionTitle: { color: '#9CA3AF', fontSize: 12 },
  fundsCarousel: {
    paddingHorizontal: 16,
  },
  fundCard: {
    width: width * 0.68,
    marginRight: 12,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 16,
    padding: 8, // Reduce inner padding to lower overall card height for MY FUNDS items
    height: 140, // Hard cap the card height so Bitcoin/My Funds cards are not too tall
  },
  addFundCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fundHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }, // Slightly smaller gap to further reduce vertical footprint
  fundTitle: { color: '#F3F4F6', fontWeight: '700' },
  fundCode: { color: '#9CA3AF', marginLeft: 4, fontSize: 11 },
  fundMiniChartGreen: { height: 150, backgroundColor: '#064E3B', borderRadius: 6, marginBottom: 10 }, // Further reduce mini-chart height for a more compact card
  fundFooterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  fundPrice: { color: '#E5E7EB', fontWeight: '700', fontSize: 14 },
  fundChangeGreen: { color: '#10B981', fontSize: 11 },
  segmentsRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
  },
  segment: { flex: 1, backgroundColor: '#0B0F16', borderRadius: 10, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: '#1F2937' },
  segmentActive: { backgroundColor: '#111827' },
  segmentText: { color: '#9CA3AF', fontSize: 12 },
  segmentActiveText: { color: '#E5E7EB', fontWeight: '700', fontSize: 12 },
  sellButton: {
    backgroundColor: '#8B5CF6',
  },
  sellButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333333',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  holdingsSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  holdingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  holdingsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  seeAllText: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  holdingsList: {
    gap: 16,
  },
  holdingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  holdingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cryptoIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cryptoIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cryptoInfo: {
    flex: 1,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  cryptoCode: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  holdingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartContainer: {
    width: 40,
    height: 20,
    marginRight: 12,
    justifyContent: 'center',
  },
  chartLine: {
    height: 2,
    borderRadius: 1,
  },
  greenLine: {
    backgroundColor: '#10B981',
  },
  orangeLine: {
    backgroundColor: '#FF8C00',
  },
  holdingValues: {
    alignItems: 'flex-end',
  },
  holdingValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  holdingQuantity: {
    fontSize: 14,
    color: '#CCCCCC',
  },
});
