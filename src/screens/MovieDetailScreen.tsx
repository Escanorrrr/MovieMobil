import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Movie } from '../entities/Movie';
import { Actor } from '../entities/Actor';
import { MovieDetailDto } from '../dtos/MovieDetailDto';
import { fetchMovieDetail, fetchMovieCredits, fetchMovieTrailer } from '../services/movieService';
import { IMAGE_URL } from '../config';
import { COLORS } from '../styles/colors';
import { FONT, SPACING, RADIUS } from '../styles/theme';
import MovieTitleAndRating from '../components/MovieTitleAndRating';
import MovieDetails from '../components/MovieDetails';
import MovieOverview from '../components/MovieOverview';
import ActorList from '../components/ActorList';
import ErrorBox from '../components/ErrorBox';
import { MovieVideoDto } from '../dtos/MovieVideoDto';
import { WebView } from 'react-native-webview';

type RootStackParamList = {
  MovieDetail: { movie: Movie };
};

type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

export default function MovieDetailScreen() {
  const route = useRoute<MovieDetailRouteProp>();
  const { movie } = route.params;
  
  const [movieDetail, setMovieDetail] = useState<MovieDetailDto | null>(null);
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trailer, setTrailer] = useState<MovieVideoDto | null>(null);
  const [trailerModalVisible, setTrailerModalVisible] = useState(false);

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        const [detailData, creditsData] = await Promise.all([
          fetchMovieDetail(movie.id),
          fetchMovieCredits(movie.id)
        ]);
        setMovieDetail(detailData);
        setActors(creditsData.cast.slice(0, 10));
        const trailerData = await fetchMovieTrailer(movie.id);
        setTrailer(trailerData);
      } catch (error: any) {
        setError(error.message || 'Film verileri yüklenirken hata oluştu.');
      } finally {
        setLoading(false);
      }
    };
    loadMovieData();
  }, [movie.id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Film bilgileri yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {error && <ErrorBox message={error} onClose={() => setError(null)} />}
      {/* Film Posteri */}
      <Image 
        source={{ uri: `${IMAGE_URL}${movie.poster_path}` }} 
        style={styles.poster}
        resizeMode="cover"
      />
      {/* Fragman butonu */}
      {trailer && (
        <TouchableOpacity style={styles.trailerButton} onPress={() => setTrailerModalVisible(true)}>
          <Text style={styles.trailerButtonText}>Fragmanı İzle</Text>
        </TouchableOpacity>
      )}
      {/* Film Bilgileri */}
      <View style={styles.content}>
        <MovieTitleAndRating title={movie.title} voteAverage={movie.vote_average} />
        {movieDetail && (
          <MovieDetails 
            release_date={movieDetail.release_date} 
            runtime={movieDetail.runtime} 
            genres={movieDetail.genres} 
          />
        )}
        <MovieOverview overview={movie.overview} />
        <ActorList actors={actors} imageBaseUrl={IMAGE_URL} />
      </View>
      {/* Trailer Modal */}
      <Modal visible={trailerModalVisible} animationType="slide" onRequestClose={() => setTrailerModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <TouchableOpacity style={styles.closeModalButton} onPress={() => setTrailerModalVisible(false)}>
            <Text style={styles.closeModalButtonText}>Kapat</Text>
          </TouchableOpacity>
          {trailer && (
            <WebView
              style={{ flex: 1 }}
              source={{ uri: `https://www.youtube.com/embed/${trailer.key}` }}
              allowsFullscreenVideo
            />
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: RADIUS.md,
  },
  content: {
    padding: SPACING.xl,
  },
  trailerButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    alignItems: 'center',
    margin: SPACING.lg,
  },
  trailerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FONT.size.md,
  },
  closeModalButton: {
    backgroundColor: COLORS.error,
    padding: SPACING.md,
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FONT.size.md,
  },
});
