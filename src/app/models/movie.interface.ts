export interface Movie {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: string[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  name?: string;
  video?: false,
  vote_average?: number;
  vote_count?: number;
}

export interface MoviesData {
  page?: number;
  results?: Movie[];
  total_pages?: number;
  total_results?: number;
}
