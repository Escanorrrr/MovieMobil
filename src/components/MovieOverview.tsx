import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';
import { FONT, SPACING } from '../styles/theme';

type Props = {
  overview: string;
};

export default function MovieOverview({ overview }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Özet</Text>
      <Text style={styles.overview}>{overview}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.lg },
  sectionTitle: {
    fontSize: FONT.size.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
    color: COLORS.textDark,
    fontFamily: FONT.family.bold,
  },
  overview: {
    fontSize: FONT.size.md,
    lineHeight: 24,
    color: COLORS.textLight,
    fontFamily: FONT.family.regular,
  },
}); 