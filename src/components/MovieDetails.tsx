import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';
import { FONT, SPACING, RADIUS } from '../styles/theme';
import { MovieDetailDto } from '../dtos/MovieDetailDto';

interface Genre { name: string; }
type Props = Pick<MovieDetailDto, 'release_date' | 'runtime' | 'genres'>;

export default function MovieDetails({ release_date, runtime, genres }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Yayın Tarihi: </Text>
        {new Date(release_date).getFullYear()}
      </Text>
      {runtime > 0 && (
        <Text style={styles.detailText}>
          <Text style={styles.label}>Süre: </Text>
          {Math.floor(runtime / 60)}s {runtime % 60}dk
        </Text>
      )}
      {genres && genres.length > 0 && (
        <Text style={styles.detailText}>
          <Text style={styles.label}>Tür: </Text>
          {genres.map(genre => genre.name).join(', ')}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    shadowColor: COLORS.textDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
  },
  detailText: {
    fontSize: FONT.size.md,
    marginBottom: SPACING.sm,
    color: COLORS.textDark,
    fontFamily: FONT.family.regular,
  },
  label: {
    fontWeight: 'bold',
    color: COLORS.textLight,
    fontFamily: FONT.family.bold,
  },
}); 