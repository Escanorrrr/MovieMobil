import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Movie, MovieDetail, Actor, fetchMovieDetail, fetchMovieCredits } from '../services/movieService';
import { IMAGE_URL } from '../config';

type RootStackParamList = {
  MovieDetail: { movie: Movie };
};

type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

export default function MovieDetailScreen() {
  const route = useRoute<MovieDetailRouteProp>();
  const { movie } = route.params;
  
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
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
        <Text style={styles.title}>{movie.title}</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {movie.vote_average}/10</Text>
        </View>

        {movieDetail && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Yayın Tarihi: </Text>
              {new Date(movieDetail.release_date).getFullYear()}
            </Text>
            
            {movieDetail.runtime > 0 && (
              <Text style={styles.detailText}>
                <Text style={styles.label}>Süre: </Text>
                {Math.floor(movieDetail.runtime / 60)}s {movieDetail.runtime % 60}dk
              </Text>
            )}
            
            {movieDetail.genres && movieDetail.genres.length > 0 && (
              <Text style={styles.detailText}>
                <Text style={styles.label}>Tür: </Text>
                {movieDetail.genres.map(genre => genre.name).join(', ')}
              </Text>
            )}
          </View>
        )}

        {/* Film Özeti */}
        <View style={styles.overviewContainer}>
          <Text style={styles.sectionTitle}>Özet</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>

        {/* Aktörler */}
        {actors.length > 0 && (
          <View style={styles.castContainer}>
            <Text style={styles.sectionTitle}>Oyuncular</Text>
            {actors.map((actor, index) => (
              <View key={actor.id} style={styles.actorItem}>
                <Image 
                  source={{ 
                    uri: actor.profile_path 
                      ? `${IMAGE_URL}${actor.profile_path}` 
                      : 'https://via.placeholder.com/50x50?text=?' 
                  }} 
                  style={styles.actorImage}
                />
                <View style={styles.actorInfo}>
                  <Text style={styles.actorName}>{actor.name}</Text>
                  <Text style={styles.actorCharacter}>{actor.character}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: 400,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  ratingContainer: {
    marginBottom: 20,
  },
  rating: {
    fontSize: 18,
    color: '#666',
  },
  detailsContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#666',
  },
  overviewContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  castContainer: {
    marginBottom: 20,
  },
  actorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  actorInfo: {
    flex: 1,
  },
  actorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  actorCharacter: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});
