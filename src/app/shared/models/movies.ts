import { TvItem } from './tv';

export interface ApiResponse<T> {
  page: number;
  results: T[];

  total_pages: number;
  total_results: number;
}
export interface MediaItem {
  adult: boolean;
  backdrop_path: string | null;
  id: number;

  title: string;
  original_title: string;
  release_date: string;

  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];

  overview: string;
  poster_path: string | null;
  media_type: 'movie' | 'tv';
  original_language: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  video: boolean;
}
