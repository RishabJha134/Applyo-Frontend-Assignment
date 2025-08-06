// Types for OMDb API responses

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Plot: string;
  Director: string;
  Actors: string;
  Genre: string;
  Runtime: string;
  imdbRating: string;
  Released: string;
  Country: string;
  Language: string;
  Awards: string;
  Writer: string;
  Response: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface SearchFilters {
  query: string;
  type: 'movie' | 'series' | '';
  year: string;
  page: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
