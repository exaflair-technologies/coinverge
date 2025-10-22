import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Holdings list screen (View all)
 * Mirrors the right mock: header, title, and list of assets with mini charts.
 */
export default function HoldingsScreen() {
  const router = useRouter();
  const handleBack = () => router.back();

  const items = [
    { name: 'Bitcoin', symbol: 'BTC', price: '$26927', qty: '2.05', color: '#FF8C00' },
    { name: 'Litecoin', symbol: 'LTC', price: '$6927', qty: '2.05', color: '#10B981' },
    { name: 'Ripple', symbol: 'XRP', price: '$4637', qty: '2.05', color: '#10B981' },
    { name: 'Ethereum', symbol: 'ETH', price: '$503.12', qty: '50', color: '#10B981' },
  ];

  const handleOpen = (item: typeof items[number]) => {
    router.push({ pathname: '/trading/[symbol]', params: { symbol: item.symbol, name: item.name, price: item.price.replace('$',''), qty: item.qty } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Holdings</ThemedText>
        <View style={styles.iconBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <TouchableOpacity key={item.symbol} style={styles.row} onPress={() => handleOpen(item)}>
            <View style={styles.left}>
              <View style={styles.iconBox}>
                <ThemedText style={styles.iconText}>{item.symbol.slice(0,1)}</ThemedText>
              </View>
              <View style={{ flex: 1 }}>
                <ThemedText style={styles.name}>{item.name}</ThemedText>
                <ThemedText style={styles.code}>{item.symbol}</ThemedText>
              </View>
            </View>
            <View style={styles.right}>
              <View style={[styles.chart, { backgroundColor: item.color }]} />
              <View style={{ alignItems: 'flex-end' }}>
                <ThemedText style={styles.price}>{item.price}</ThemedText>
                <ThemedText style={styles.qty}>{item.qty} {item.symbol}</ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  iconBtn: { padding: 8 },
  title: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#0B0F16' },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconBox: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center', marginRight: 12, borderWidth: 1, borderColor: '#1F2937' },
  iconText: { color: '#FFFFFF', fontWeight: '700' },
  name: { color: '#FFFFFF', fontWeight: '700' },
  code: { color: '#9CA3AF', fontSize: 12 },
  right: { flexDirection: 'row', alignItems: 'center' },
  chart: { width: 48, height: 20, borderRadius: 4, marginRight: 12, opacity: 0.8 },
  price: { color: '#E5E7EB', fontWeight: '700' },
  qty: { color: '#9CA3AF', fontSize: 12 },
});


