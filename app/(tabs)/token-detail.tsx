import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Mock data for tokens
const tokens = {
  BTC: {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 26927,
    change: 2.45,
    icon: '₿',
    color: '#f7931a',
    history: [26000, 26500, 26800, 26927, 26750, 26927],
  },
  ETH: {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 1650,
    change: -1.23,
    icon: 'Ξ',
    color: '#627eea',
    history: [1600, 1620, 1650, 1640, 1650, 1650],
  },
  LTC: {
    name: 'Litecoin',
    symbol: 'LTC',
    price: 72.5,
    change: 0.89,
    icon: 'Ł',
    color: '#bfbbbb',
    history: [70, 71, 72, 72.5, 72, 72.5],
  },
  XRP: {
    name: 'Ripple',
    symbol: 'XRP',
    price: 0.52,
    change: -0.45,
    icon: 'X',
    color: '#23292f',
    history: [0.50, 0.51, 0.52, 0.53, 0.52, 0.52],
  },
  SOL: {
    name: 'Solana',
    symbol: 'SOL',
    price: 98.5,
    change: 3.12,
    icon: '◎',
    color: '#14f195',
    history: [95, 96, 98, 98.5, 97, 98.5],
  },
};

export default function TokenDetailScreen() {
  const [selectedToken, setSelectedToken] = useState('BTC');
  const [amount, setAmount] = useState('345');
  const [price, setPrice] = useState('0.031');
  const [swapFromToken, setSwapFromToken] = useState('BTC');
  const [swapToToken, setSwapToToken] = useState('ETH');
  const [swapAmount, setSwapAmount] = useState('');
  const [showSwapModal, setShowSwapModal] = useState(false);
  const router = useRouter();

  const token = tokens[selectedToken as keyof typeof tokens];

  // Mock price chart data
  const chartData = token.history;
  const maxPrice = Math.max(...chartData);
  const minPrice = Math.min(...chartData);
  const priceRange = maxPrice - minPrice;

  const generatePath = () => {
    const stepX = (width - 60) / (chartData.length - 1);
    let path = '';
    
    chartData.forEach((price, index) => {
      const x = 30 + index * stepX;
      const y = 200 - ((price - minPrice) / priceRange) * 150;
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    return path;
  };

  const handleTokenSelect = (tokenSymbol: string) => {
    setSelectedToken(tokenSymbol);
  };

  const handleBuy = () => {
    const tokenAmount = parseFloat(amount) / parseFloat(price);
    Alert.alert('Buy Order', `Buy ${tokenAmount.toFixed(6)} ${token.symbol} for ${amount} USD at ${price} USD per ${token.symbol}`);
  };

  const handleSell = () => {
    const tokenAmount = parseFloat(amount) / parseFloat(price);
    Alert.alert('Sell Order', `Sell ${tokenAmount.toFixed(6)} ${token.symbol} for ${amount} USD at ${price} USD per ${token.symbol}`);
  };

  const handleSend = () => {
    Alert.alert('Send', `Send ${token.symbol} to another wallet`);
  };

  const handleReceive = () => {
    Alert.alert('Receive', `Receive ${token.symbol} to your wallet`);
  };

  const handleSwap = () => {
    setShowSwapModal(true);
  };

  const executeSwap = () => {
    console.log('Execute Swap button pressed!');
    console.log('Current swap amount:', swapAmount);
    
    // Immediate test alert
    Alert.alert('Debug', `Button pressed! Amount: ${swapAmount}`);
    
    if (!swapAmount || parseFloat(swapAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    
    const fromToken = tokens[swapFromToken as keyof typeof tokens];
    const toToken = tokens[swapToToken as keyof typeof tokens];
    
    if (!fromToken || !toToken) {
      Alert.alert('Error', 'Invalid token selection');
      return;
    }
    
    const estimatedAmount = (parseFloat(swapAmount) * fromToken.price) / toToken.price;
    
    console.log('Swap Debug:', {
      swapAmount,
      fromToken: fromToken.symbol,
      toToken: toToken.symbol,
      fromPrice: fromToken.price,
      toPrice: toToken.price,
      estimatedAmount
    });
    
    Alert.alert(
      'Swap Confirmation',
      `Swap ${swapAmount} ${fromToken.symbol} for approximately ${estimatedAmount.toFixed(6)} ${toToken.symbol}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm Swap', 
          onPress: () => {
            try {
              // Actually perform the swap
              console.log('Executing swap...');
              setSelectedToken(swapToToken);
              setAmount(estimatedAmount.toFixed(2));
              setPrice(toToken.price.toString());
              
              console.log('Swap completed:', {
                newToken: swapToToken,
                newAmount: estimatedAmount.toFixed(2),
                newPrice: toToken.price.toString()
              });
              
              Alert.alert('Success', `Successfully swapped ${swapAmount} ${fromToken.symbol} for ${estimatedAmount.toFixed(6)} ${toToken.symbol}!`);
              setShowSwapModal(false);
              setSwapAmount('');
            } catch (error) {
              console.error('Swap error:', error);
              Alert.alert('Error', 'Failed to execute swap');
            }
          }
        }
      ]
    );
  };

  const swapTokens = () => {
    const temp = swapFromToken;
    setSwapFromToken(swapToToken);
    setSwapToToken(temp);
    setSwapAmount('');
  };

  const handlePercentage = (percentage: number) => {
    const newAmount = (345 * percentage / 100).toFixed(0);
    setAmount(newAmount);
  };

  // Real-time calculations
  const calculateTokenAmount = () => {
    const amountNum = parseFloat(amount) || 0;
    const priceNum = parseFloat(price) || 0;
    if (priceNum > 0) {
      return (amountNum / priceNum).toFixed(6);
    }
    return '0.000000';
  };

  const calculateTotalValue = () => {
    const amountNum = parseFloat(amount) || 0;
    return amountNum.toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trading</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Token Selection */}
        <View style={styles.tokenTabs}>
          {Object.keys(tokens).map((symbol) => (
            <TouchableOpacity
              key={symbol}
              style={[
                styles.tokenTab,
                selectedToken === symbol && styles.tokenTabActive,
              ]}
              onPress={() => handleTokenSelect(symbol)}
            >
              <Text style={[
                styles.tokenTabText,
                selectedToken === symbol && styles.tokenTabTextActive,
              ]}>
                {symbol}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Token Info */}
        <View style={styles.tokenInfo}>
          <View style={styles.tokenIconContainer}>
            <Text style={[styles.tokenIcon, { color: token.color }]}>
              {token.icon}
            </Text>
          </View>
          <Text style={styles.tokenName}>{token.name}</Text>
          <Text style={styles.tokenSymbol}>{token.symbol}</Text>
          <Text style={styles.tokenPrice}>
            ${token.price.toLocaleString()}
            <Text style={[
              styles.priceChange,
              { color: token.change >= 0 ? '#4ade80' : '#f87171' }
            ]}>
              {token.change >= 0 ? '+' : ''}{token.change}%
            </Text>
          </Text>
        </View>

        {/* Price Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Price History</Text>
            <Text style={styles.chartPeriod}>7D</Text>
          </View>
          
          <View style={styles.chart}>
            <Svg height="200" width={width - 40}>
              
              {/* Chart line */}
              <Path
                d={generatePath()}
                stroke={token.color}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Chart area fill */}
              <Path
                d={`${generatePath()} L ${30 + (chartData.length - 1) * ((width - 60) / (chartData.length - 1))} 200 L 30 200 Z`}
                fill={token.color}
                opacity={0.3}
              />
            </Svg>
          </View>
          
          {/* Chart labels */}
          <View style={styles.chartLabels}>
            <Text style={styles.chartLabel}>Mon</Text>
            <Text style={styles.chartLabel}>15</Text>
            <Text style={styles.chartLabel}>16</Text>
            <Text style={styles.chartLabel}>17</Text>
            <Text style={styles.chartLabel}>18</Text>
            <Text style={styles.chartLabel}>19</Text>
            <Text style={styles.chartLabel}>20</Text>
            <Text style={styles.chartLabel}>21</Text>
            <Text style={styles.chartLabel}>22</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
            <Text style={styles.buyButtonText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sellButton} onPress={handleSell}>
            <Text style={styles.sellButtonText}>Sell</Text>
          </TouchableOpacity>
        </View>

        {/* Order Details */}
        <View style={styles.orderDetails}>
          <View style={styles.priceInput}>
            <Text style={styles.inputLabel}>At Price | USD</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputValue}
                value={price}
                onChangeText={setPrice}
                placeholder="0.031"
                placeholderTextColor="#6b7280"
                keyboardType="decimal-pad"
              />
            </View>
          </View>
          
          <View style={styles.amountInput}>
            <Text style={styles.inputLabel}>Amount</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputValue}
                value={amount}
                onChangeText={setAmount}
                placeholder="345"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
              />
              <Text style={styles.inputSuffix}>USD</Text>
            </View>
          </View>

          {/* Percentage Buttons */}
          <View style={styles.percentageButtons}>
            {[25, 50, 75, 100].map((percentage) => (
              <TouchableOpacity
                key={percentage}
                style={styles.percentageButton}
                onPress={() => handlePercentage(percentage)}
              >
                <Text style={styles.percentageButtonText}>{percentage}%</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Real-time Calculation Display */}
          <View style={styles.calculationDisplay}>
            <View style={styles.calculationRow}>
              <Text style={styles.calculationLabel}>You will receive:</Text>
              <Text style={styles.calculationValue}>
                {calculateTokenAmount()} {token.symbol}
              </Text>
            </View>
            <View style={styles.calculationRow}>
              <Text style={styles.calculationLabel}>Total Value:</Text>
              <Text style={styles.calculationValue}>
                ${calculateTotalValue()} USD
              </Text>
            </View>
          </View>
        </View>

        {/* Additional Actions */}
        <View style={styles.additionalActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSend}>
            <Text style={styles.actionIcon}>📤</Text>
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleReceive}>
            <Text style={styles.actionIcon}>📥</Text>
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleSwap}>
            <Text style={styles.actionIcon}>🔄</Text>
            <Text style={styles.actionText}>Swap</Text>
          </TouchableOpacity>
        </View>

        {/* Swap Modal */}
        {showSwapModal && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Swap Tokens</Text>
                <TouchableOpacity onPress={() => setShowSwapModal(false)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.swapSection}>
                <Text style={styles.swapLabel}>From</Text>
                <View style={styles.swapInputContainer}>
                  <TouchableOpacity style={styles.tokenSelector}>
                    <Text style={styles.swapTokenIcon}>{tokens[swapFromToken as keyof typeof tokens].icon}</Text>
                    <Text style={styles.swapTokenSymbol}>{swapFromToken}</Text>
                    <Text style={styles.dropdownArrow}>▼</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.swapInput}
                    value={swapAmount}
                    onChangeText={setSwapAmount}
                    placeholder="0.0"
                    placeholderTextColor="#6b7280"
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.swapArrow} onPress={swapTokens}>
                <Text style={styles.swapArrowText}>⇅</Text>
              </TouchableOpacity>

              <View style={styles.swapSection}>
                <Text style={styles.swapLabel}>To</Text>
                <View style={styles.swapInputContainer}>
                  <TouchableOpacity style={styles.tokenSelector}>
                    <Text style={styles.swapTokenIcon}>{tokens[swapToToken as keyof typeof tokens].icon}</Text>
                    <Text style={styles.swapTokenSymbol}>{swapToToken}</Text>
                    <Text style={styles.dropdownArrow}>▼</Text>
                  </TouchableOpacity>
                  <Text style={styles.swapOutput}>
                    {swapAmount ? 
                      ((parseFloat(swapAmount) * tokens[swapFromToken as keyof typeof tokens].price) / tokens[swapToToken as keyof typeof tokens].price).toFixed(6) 
                      : '0.0'
                    }
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.executeSwapButton} onPress={executeSwap}>
                <Text style={styles.executeSwapButtonText}>Execute Swap</Text>
              </TouchableOpacity>
              
              {/* Test button for debugging */}
              <TouchableOpacity 
                style={[styles.executeSwapButton, { backgroundColor: '#ff6b6b', marginTop: 10 }]} 
                onPress={() => {
                  console.log('Test swap button pressed');
                  setSelectedToken('ETH');
                  setAmount('100');
                  setPrice('1650');
                  setShowSwapModal(false);
                  Alert.alert('Test', 'Test swap executed - switched to ETH');
                }}
              >
                <Text style={styles.executeSwapButtonText}>Test Swap (ETH)</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#272727',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  settingsButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tokenTabs: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 4,
  },
  tokenTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  tokenTabActive: {
    backgroundColor: '#8b45ff',
  },
  tokenTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9ca3af',
  },
  tokenTabTextActive: {
    color: '#ffffff',
  },
  tokenInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  tokenIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  tokenIcon: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  tokenName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  tokenSymbol: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 10,
  },
  tokenPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  priceChange: {
    fontSize: 16,
    marginLeft: 10,
  },
  chartContainer: {
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  chartPeriod: {
    fontSize: 14,
    color: '#8b45ff',
    fontWeight: '500',
  },
  chart: {
    height: 200,
    marginBottom: 15,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  chartLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#8b45ff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  sellButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#8b45ff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  sellButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8b45ff',
  },
  orderDetails: {
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  priceInput: {
    marginBottom: 20,
  },
  amountInput: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#272727',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    flex: 1,
  },
  inputSuffix: {
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: '500',
  },
  percentageButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  percentageButton: {
    flex: 1,
    backgroundColor: '#272727',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  percentageButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  calculationDisplay: {
    backgroundColor: '#272727',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  calculationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  calculationLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  calculationValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  additionalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  actionButton: {
    alignItems: 'center',
    padding: 15,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500',
  },
  // Swap modal styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    fontSize: 24,
    color: '#9ca3af',
    fontWeight: 'bold',
  },
  swapSection: {
    marginBottom: 20,
  },
  swapLabel: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 8,
  },
  swapInputContainer: {
    backgroundColor: '#272727',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tokenSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swapTokenIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  swapTokenSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 8,
  },
  swapInput: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'right',
    minWidth: 100,
  },
  swapOutput: {
    fontSize: 18,
    color: '#9ca3af',
    fontWeight: '600',
    textAlign: 'right',
    minWidth: 100,
  },
  swapArrow: {
    alignItems: 'center',
    marginVertical: 10,
  },
  swapArrowText: {
    fontSize: 24,
    color: '#8b45ff',
    fontWeight: 'bold',
  },
  executeSwapButton: {
    backgroundColor: '#8b45ff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  executeSwapButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
