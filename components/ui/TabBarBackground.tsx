import React from 'react';
import { View, StyleSheet } from 'react-native';

// This provides a proper background for the tab bar
export default function TabBarBackground() {
  return <View style={styles.background} />;
}

export function useBottomTabOverflow() {
  return 0;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
