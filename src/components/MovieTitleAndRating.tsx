import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';
import { FONT, SPACING } from '../styles/theme';

type Props = {
  title: string;
  voteAverage: number;
};

export default function MovieTitleAndRating({ title, voteAverage }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.rating}>⭐ {voteAverage}/10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.lg },
  title: {
    fontSize: FONT.size.xxl,
    fontWeight: 'bold',
    color: COLORS.textDark,
    fontFamily: FONT.family.bold,
    marginBottom: SPACING.sm,
  },
  rating: {
    fontSize: FONT.size.lg,
    color: COLORS.textLight,
    fontFamily: FONT.family.regular,
  },
}); 