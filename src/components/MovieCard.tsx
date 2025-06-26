import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Movie } from '../entities/Movie';
import { IMAGE_URL } from '../config';
import { COLORS } from '../styles/colors';
import { FONT, SPACING, RADIUS } from '../styles/theme';

type Props = {
  movie: Movie;
  onPress?: () => void;
};

export default function MovieCard({ movie, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.card}>
        <Image source={{ uri: `${IMAGE_URL}${movie.poster_path}` }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', marginBottom: SPACING.md, backgroundColor: COLORS.cardBackground, borderRadius: RADIUS.md, borderColor: COLORS.cardBorder, borderWidth: 1, overflow: 'hidden' },
  image: { width: 100, height: 150, borderRadius: RADIUS.md },
  info: { flex: 1, marginLeft: SPACING.md, justifyContent: 'center' },
  title: { fontSize: FONT.size.md, fontWeight: 'bold', color: COLORS.textDark, fontFamily: FONT.family.bold },
  rating: { fontSize: FONT.size.sm, color: COLORS.secondary, fontFamily: FONT.family.regular },
});
