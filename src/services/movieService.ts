import { API_KEY, BASE_URL } from '../config';
import { Movie } from '../entities/Movie';
import { Actor } from '../entities/Actor';
import { MovieDetailDto } from '../dtos/MovieDetailDto';

export interface MovieCredits {
  cast: Actor[];
}

export async function fetchPopularMovies(): Promise<Movie[]> {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    if (!res.ok) {
      throw new Error('Popüler filmler alınamadı. Sunucu hatası!');
    }
    const data = await res.json();
    return data.results;
  } catch (error: any) {
    throw new Error(error.message || 'Bilinmeyen bir hata oluştu.');
  }
}

export async function fetchMovieDetail(movieId: number): Promise<MovieDetailDto> {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data;
}

export async function fetchMovieCredits(movieId: number): Promise<MovieCredits> {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data;
}

export async function fetchSearchedMovies(query: string): Promise<Movie[]> {
  try {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`);
    if (!res.ok) {
      throw new Error('Arama sonuçları alınamadı. Sunucu hatası!');
    }
    const data = await res.json();
    return data.results;
  } catch (error: any) {
    throw new Error(error.message || 'Bilinmeyen bir hata oluştu.');
  }
}
