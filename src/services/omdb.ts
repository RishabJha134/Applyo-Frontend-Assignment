import { SearchResponse, MovieDetails, SearchFilters } from '@/types/movie';

const API_BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

export class OMDbAPI {
  private static buildURL(params: Record<string, string>): string {
    const url = new URL(API_BASE_URL);
    url.searchParams.append('apikey', API_KEY || '');
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });
    
    return url.toString();
  }

  static async searchMovies(filters: SearchFilters): Promise<SearchResponse> {
    try {
      if (!API_KEY) {
        throw new Error('API key is not configured. Please add NEXT_PUBLIC_OMDB_API_KEY to your .env.local file.');
      }

      if (!filters.query.trim()) {
        return {
          Search: [],
          totalResults: '0',
          Response: 'False',
          Error: 'Please enter a search term'
        };
      }

      const params: Record<string, string> = {
        s: filters.query,
        page: filters.page.toString(),
      };

      if (filters.type) {
        params.type = filters.type;
      }

      if (filters.year) {
        params.y = filters.year;
      }

      const url = this.buildURL(params);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: SearchResponse = await response.json();
      
      if (data.Response === 'False') {
        return {
          Search: [],
          totalResults: '0',
          Response: 'False',
          Error: data.Error || 'No movies found'
        };
      }
      
      return data;
    } catch (error) {
      console.error('Error searching movies:', error);
      return {
        Search: [],
        totalResults: '0',
        Response: 'False',
        Error: error instanceof Error ? error.message : 'An error occurred while searching'
      };
    }
  }

  static async getMovieDetails(imdbID: string): Promise<MovieDetails | null> {
    try {
      if (!API_KEY) {
        throw new Error('API key is not configured');
      }

      const url = this.buildURL({ i: imdbID, plot: 'full' });
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: MovieDetails = await response.json();
      
      if (data.Response === 'False') {
        throw new Error('Movie not found');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  }
}
