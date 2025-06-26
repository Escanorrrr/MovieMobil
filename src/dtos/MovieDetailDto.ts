import { Movie } from '../entities/Movie';

export interface MovieDetailDto extends Movie {
  release_date: string;
  runtime: number;
  genres: Array<{ id: number; name: string }>;
} 