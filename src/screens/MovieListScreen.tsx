import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { fetchPopularMovies, Movie } from '../services/movieService';
import MovieCard from '../components/MovieCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  MovieList: undefined;
  MovieDetail: { movie: Movie };
};

export default function MovieListScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetchPopularMovies()
      .then(setMovies)
      .catch(console.error);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Popüler Filmler</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('MovieDetail', { movie: item })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 15 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
