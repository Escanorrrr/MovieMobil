import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';
import { SPACING, RADIUS } from '../styles/theme';

export default function MovieCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.image} />
      <View style={styles.info}>
        <View style={styles.title} />
        <View style={styles.rating} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.md,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    overflow: 'hidden',
    padding: SPACING.md,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.accent,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'center',
  },
  title: {
    width: '70%',
    height: 22,
    backgroundColor: COLORS.accent,
    borderRadius: 4,
    marginBottom: 12,
  },
  rating: {
    width: 60,
    height: 16,
    backgroundColor: COLORS.accent,
    borderRadius: 4,
  },
}); 