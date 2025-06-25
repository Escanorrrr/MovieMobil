import { API_KEY, BASE_URL } from '../config';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

export interface MovieDetail extends Movie {
  release_date: string;
  runtime: number;
  genres: Array<{ id: number; name: string }>;
}

export interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface MovieCredits {
  cast: Actor[];
}

export async function fetchPopularMovies(): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await res.json();
  return data.results;
}

export async function fetchMovieDetail(movieId: number): Promise<MovieDetail> {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data;
}

export async function fetchMovieCredits(movieId: number): Promise<MovieCredits> {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data;
}
