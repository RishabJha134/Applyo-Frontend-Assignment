import { useState, useCallback } from 'react';
import { Movie, SearchFilters, PaginationInfo } from '@/types/movie';
import { OMDbAPI } from '@/services/omdb';

export const useMovieSearch = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    type: '',
    year: '',
    page: 1,
  });

  const searchMovies = useCallback(async (searchFilters: SearchFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await OMDbAPI.searchMovies(searchFilters);
      
      if (response.Response === 'False') {
        setError(response.Error || 'No movies found');
        setMovies([]);
        setPagination({
          currentPage: 1,
          totalPages: 0,
          totalResults: 0,
          hasNextPage: false,
          hasPrevPage: false,
        });
      } else {
        setMovies(response.Search);
        const totalResults = parseInt(response.totalResults);
        const totalPages = Math.ceil(totalResults / 10); // 10 results per page
        
        setPagination({
          currentPage: searchFilters.page,
          totalPages,
          totalResults,
          hasNextPage: searchFilters.page < totalPages,
          hasPrevPage: searchFilters.page > 1,
        });
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    if (updatedFilters.query.trim()) {
      searchMovies(updatedFilters);
    }
  }, [filters, searchMovies]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      updateFilters({ page });
    }
  }, [pagination.totalPages, updateFilters]);

  const resetSearch = useCallback(() => {
    setMovies([]);
    setError(null);
    setFilters({ query: '', type: '', year: '', page: 1 });
    setPagination({
      currentPage: 1,
      totalPages: 0,
      totalResults: 0,
      hasNextPage: false,
      hasPrevPage: false,
    });
  }, []);

  return {
    movies,
    loading,
    error,
    pagination,
    filters,
    searchMovies,
    updateFilters,
    goToPage,
    resetSearch,
  };
};
