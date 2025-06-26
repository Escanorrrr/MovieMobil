import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Movie } from '../entities/Movie';
import { Actor } from '../entities/Actor';
import { MovieDetailDto } from '../dtos/MovieDetailDto';
import { fetchMovieDetail, fetchMovieCredits } from '../services/movieService';
import { IMAGE_URL } from '../config';
import { COLORS } from '../styles/colors';
import { FONT, SPACING, RADIUS } from '../styles/theme';
import MovieTitleAndRating from '../components/MovieTitleAndRating';
import MovieDetails from '../components/MovieDetails';
import MovieOverview from '../components/MovieOverview';
import ActorList from '../components/ActorList';

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

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        const [detailData, creditsData] = await Promise.all([
          fetchMovieDetail(movie.id),
          fetchMovieCredits(movie.id)
        ]);
        
        setMovieDetail(detailData);
        setActors(creditsData.cast.slice(0, 10)); // İlk 10 aktörü al
      } catch (error) {
        console.error('Film verileri yüklenirken hata:', error);
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
      {/* Film Posteri */}
      <Image 
        source={{ uri: `${IMAGE_URL}${movie.poster_path}` }} 
        style={styles.poster}
        resizeMode="cover"
      />
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
});
