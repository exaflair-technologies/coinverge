import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

/**
 * Trading details screen
 * Shows price chart with mock data, coin information, and Buy/Sell actions.
 * Includes time period selector and price statistics.
 */
export default function TradingScreen() {
  const router = useRouter();
  const { symbol = 'BTC', name = 'Bitcoin', price = '26927', qty = '2.05' } = useLocalSearchParams<{
    symbol?: string;
    name?: string;
    price?: string;
    qty?: string;
  }>();

  // State for time period selection
  const [selectedPeriod, setSelectedPeriod] = useState('1D');

  // Mock price data for different time periods
  const mockData = {
    '1D': {
      prices: [26800, 26950, 27100, 27000, 27200, 27150, 27200, 27100, 27050, 27120, 27080, 27150, 27200, 27180, 27250, 27200, 27150, 27200, 27180, 27220, 27200, 27150, 27200, 27150],
      change: '+2.5%',
      changeValue: '+$675',
      volume: '$2.4B',
      high: '$27,450',
      low: '$26,800'
    },
    '1W': {
      prices: [26500, 26800, 27000, 27200, 27000, 27100, 27200, 27150, 27000, 27100, 27200, 27150, 27200, 27180, 27250, 27200, 27150, 27200, 27180, 27220, 27200, 27150, 27200, 27150],
      change: '+4.2%',
      changeValue: '+$1,127',
      volume: '$18.2B',
      high: '$27,450',
      low: '$26,500'
    },
    '1M': {
      prices: [25000, 25500, 26000, 26500, 26800, 27000, 27200, 27000, 27100, 27200, 27150, 27000, 27100, 27200, 27150, 27200, 27180, 27250, 27200, 27150, 27200, 27180, 27220, 27200],
      change: '+8.8%',
      changeValue: '+$2,127',
      volume: '$95.4B',
      high: '$27,450',
      low: '$25,000'
    }
  };

  const currentData = mockData[selectedPeriod as keyof typeof mockData] || mockData['1D'];

  const handleBack = () => router.back();

  /**
   * Handle time period selection
   */
  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
  };

  /**
   * Handle buy action
   */
  const handleBuy = () => {
    console.log(`Buy ${symbol} at $${price}`);
    // TODO: Implement buy logic
  };

  /**
   * Handle sell action
   */
  const handleSell = () => {
    console.log(`Sell ${symbol} at $${price}`);
    // TODO: Implement sell logic
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Trading</ThemedText>
          <View style={styles.iconBtn} />
        </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.assetRow}>
          <View style={styles.assetIcon}>
            <ThemedText style={styles.assetIconText}>{symbol.toString().slice(0, 1)}</ThemedText>
          </View>
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.assetName}>{name}</ThemedText>
            <ThemedText style={styles.assetCode}>{symbol}</ThemedText>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <ThemedText style={styles.assetPrice}>${price}</ThemedText>
            <ThemedText style={styles.assetQty}>{qty} {symbol}</ThemedText>
          </View>
        </View>

        {/* Price Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.priceInfo}>
            <ThemedText style={styles.currentPrice}>${price}</ThemedText>
            <View style={styles.priceChange}>
              <ThemedText style={styles.changeText}>{currentData.change}</ThemedText>
              <ThemedText style={styles.changeValue}>{currentData.changeValue}</ThemedText>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>24h High</ThemedText>
              <ThemedText style={styles.statValue}>{currentData.high}</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>24h Low</ThemedText>
              <ThemedText style={styles.statValue}>{currentData.low}</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>Volume</ThemedText>
              <ThemedText style={styles.statValue}>{currentData.volume}</ThemedText>
            </View>
          </View>
        </View>

        {/* Time Period Selector */}
        <View style={styles.periodSelector}>
          {['1D', '1W', '1M'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[styles.periodButton, selectedPeriod === period && styles.periodButtonActive]}
              onPress={() => handlePeriodSelect(period)}
            >
              <ThemedText style={[styles.periodText, selectedPeriod === period && styles.periodTextActive]}>
                {period}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart with Mock Data */}
        <View style={styles.chartCard}>
          <View style={styles.chartGradient}>
            <View style={styles.chartContainer}>
              {/* Y-axis labels */}
              <View style={styles.yAxis}>
                <ThemedText style={styles.axisLabel}>27.5k</ThemedText>
                <ThemedText style={styles.axisLabel}>27.0k</ThemedText>
                <ThemedText style={styles.axisLabel}>26.5k</ThemedText>
                <ThemedText style={styles.axisLabel}>26.0k</ThemedText>
              </View>
              
              {/* Chart area */}
              <View style={styles.chartArea}>
                {/* Simple smooth line chart with dark gradient fill */}
                <View style={styles.simpleChartContainer}>
                  {/* Dark gradient fill area */}
                  <LinearGradient
                    colors={['#8B5CF6', '#8B5CF6', 'transparent']}
                    style={styles.darkGradientFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                  />
                  
                  {/* Simple purple line */}
                  <View style={styles.simpleLine} />
                </View>
              </View>
            </View>
            
            {/* X-axis labels */}
            <View style={styles.xAxis}>
              <ThemedText style={styles.axisLabel}>9:00</ThemedText>
              <ThemedText style={styles.axisLabel}>12:00</ThemedText>
              <ThemedText style={styles.axisLabel}>15:00</ThemedText>
              <ThemedText style={styles.axisLabel}>18:00</ThemedText>
              <ThemedText style={styles.axisLabel}>21:00</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.primaryBtn]} onPress={handleBuy}> 
            <ThemedText style={styles.primaryBtnText}>Buy</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryBtn]} onPress={handleSell}> 
            <ThemedText style={styles.secondaryBtnText}>Sell</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Trading Input Fields */}
        <View style={styles.inputSection}>
          {/* At Price Field */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>At Price | USD</ThemedText>
            <View style={styles.inputField}>
              <ThemedText style={styles.inputValue}>0.031</ThemedText>
            </View>
          </View>

          {/* Amount Field */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Amount</ThemedText>
            <View style={styles.amountRow}>
              <View style={styles.inputField}>
                <ThemedText style={styles.inputValue}>345 USD</ThemedText>
              </View>
              <View style={styles.percentageButtons}>
                <TouchableOpacity style={styles.percentageBtn}>
                  <ThemedText style={styles.percentageText}>25%</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.percentageBtn}>
                  <ThemedText style={styles.percentageText}>50%</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.percentageBtn}>
                  <ThemedText style={styles.percentageText}>100%</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingTop: 16, 
    paddingBottom: 16,
    backgroundColor: '#000000'
  },
  iconBtn: { padding: 8 },
  title: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  assetRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 12 },
  assetIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center', marginRight: 12, borderWidth: 1, borderColor: '#1F2937' },
  assetIconText: { color: '#F3F4F6', fontWeight: '700' },
  assetName: { color: '#FFFFFF', fontWeight: '700' },
  assetCode: { color: '#9CA3AF', fontSize: 12 },
  assetPrice: { color: '#E5E7EB', fontWeight: '700' },
  assetQty: { color: '#9CA3AF', fontSize: 12 },
  
  // Price Statistics Styles
  statsContainer: { backgroundColor: '#111827', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#1F2937' },
  priceInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  currentPrice: { color: '#FFFFFF', fontSize: 24, fontWeight: '700' },
  priceChange: { alignItems: 'flex-end' },
  changeText: { color: '#10B981', fontSize: 16, fontWeight: '600' },
  changeValue: { color: '#10B981', fontSize: 14 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statItem: { alignItems: 'center' },
  statLabel: { color: '#9CA3AF', fontSize: 12, marginBottom: 4 },
  statValue: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  
  // Time Period Selector Styles
  periodSelector: { flexDirection: 'row', backgroundColor: '#111827', borderRadius: 8, padding: 4, marginBottom: 16, borderWidth: 1, borderColor: '#1F2937' },
  periodButton: { flex: 1, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6, alignItems: 'center' },
  periodButtonActive: { backgroundColor: '#8B5CF6' },
  periodText: { color: '#9CA3AF', fontSize: 14, fontWeight: '500' },
  periodTextActive: { color: '#FFFFFF', fontWeight: '600' },
  
  // Chart Styles
  chartCard: { borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#1F2937', marginBottom: 16 },
  chartGradient: { height: 280, padding: 16, backgroundColor: '#000000' },
  chartContainer: { flexDirection: 'row', height: 200 },
  yAxis: { width: 50, justifyContent: 'space-between', paddingVertical: 10, alignItems: 'flex-end' },
  axisLabel: { color: '#FFFFFF', fontSize: 12, fontWeight: '500' },
  chartArea: { flex: 1, position: 'relative', marginLeft: 8 },
  simpleChartContainer: { 
    position: 'absolute', 
    width: '100%', 
    height: 120, 
    top: 40,
    backgroundColor: '#000000'
  },
  darkGradientFill: { 
    position: 'absolute', 
    width: '100%', 
    height: '100%',
    opacity: 0.3
  },
  simpleLine: {
    position: 'absolute',
    width: '100%',
    height: 3,
    backgroundColor: '#8B5CF6',
    borderRadius: 1.5,
    top: '50%'
  },
  gridLines: { position: 'absolute', width: '100%', height: 120, top: 40 },
  gridLine: { position: 'absolute', width: '100%', height: 1, backgroundColor: '#1F2937', opacity: 0.3 },
  xAxis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingLeft: 58 },
  
  // Action Buttons
  actionsRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  primaryBtn: { flex: 1, backgroundColor: '#8B5CF6', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  primaryBtnText: { color: '#FFFFFF', fontWeight: '700' },
  secondaryBtn: { flex: 1, backgroundColor: 'transparent', borderRadius: 12, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: '#333333' },
  secondaryBtnText: { color: '#FFFFFF', fontWeight: '700' },
  
  // Input Fields
  inputSection: { marginTop: 24, gap: 20 },
  inputGroup: { gap: 8 },
  inputLabel: { color: '#9CA3AF', fontSize: 14, fontWeight: '500' },
  inputField: { 
    backgroundColor: '#111827', 
    borderRadius: 8, 
    padding: 12, 
    borderWidth: 1, 
    borderColor: '#1F2937' 
  },
  inputValue: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  amountRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  percentageButtons: { flexDirection: 'row', gap: 8 },
  percentageBtn: { 
    backgroundColor: '#111827', 
    borderRadius: 6, 
    paddingHorizontal: 12, 
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#1F2937'
  },
  percentageText: { color: '#FFFFFF', fontSize: 12, fontWeight: '500' },
});


