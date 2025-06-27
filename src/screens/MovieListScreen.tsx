import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { fetchPopularMovies, fetchSearchedMovies } from '../services/movieService';
import MovieCard from '../components/MovieCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../styles/colors';
import { FONT, SPACING } from '../styles/theme';
import { Movie } from '../entities/Movie';
import ErrorBox from '../components/ErrorBox';
import SearchBar from '../components/SearchBar';


type RootStackParamList = {
  MovieList: undefined;
  MovieDetail: { movie: Movie };
};

export default function MovieListScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searching, setSearching] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetchPopularMovies()
      .then(setMovies)
      .catch((err) => setError(err.message));
  }, []);

  const handleSearch = async (query: string) => {
    setSearching(true);
    setError(null);
    try {
      const results = await fetchSearchedMovies(query);
      setMovies(results);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSearching(false);
    }
  };

  const handleSearchButton = () => {
    setSearchVisible(true);
  };

  const handleCloseSearch = () => {
    setSearchVisible(false);
    setError(null);
    fetchPopularMovies()
      .then(setMovies)
      .catch((err) => setError(err.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      {error && <ErrorBox message={error} onClose={() => setError(null)} />}
      {searchVisible ? (
        <SearchBar onSearch={handleSearch} onClose={handleCloseSearch} loading={searching} />
      ) : (
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchButton}>
          <Text style={styles.searchButtonText}>Film Ara</Text>
        </TouchableOpacity>
      )}
      {searchVisible && !searching && movies.length === 0 ? (
        <View style={styles.noResultBox}>
          <Text style={styles.noResultText}>Aradığınız film bulunamadı.</Text>
        </View>
      ) : (
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
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: SPACING.xl, paddingHorizontal: SPACING.lg, backgroundColor: COLORS.background },
  errorBox: {
    backgroundColor: COLORS.error,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    marginLeft: SPACING.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FONT.size.md,
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  searchInput: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT.size.md,
    marginRight: SPACING.sm,
  },
  searchActionButton: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  searchActionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FONT.size.md,
  },
  closeSearchButton: {
    backgroundColor: COLORS.error,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeSearchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FONT.size.md,
  },
  noResultBox: {
    alignItems: 'center',
    marginTop: 32,
  },
  noResultText: {
    color: COLORS.textLight,
    fontSize: FONT.size.lg,
    fontWeight: 'bold',
  },
});
