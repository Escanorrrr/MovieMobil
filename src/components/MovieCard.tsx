import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Movie } from '../services/movieService';
import { IMAGE_URL } from '../config';

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
  card: { flexDirection: 'row', marginBottom: 15 },
  image: { width: 100, height: 150, borderRadius: 6 },
  info: { flex: 1, marginLeft: 10, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: 'bold' },
  rating: { fontSize: 14, color: '#888' },
});
