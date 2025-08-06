'use client';

import { useState } from 'react';
import { Movie } from '@/types/movie';
import { useMovieSearch } from '@/hooks/useMovieSearch';
import { SearchBar } from '@/components/SearchBar';
import { MovieCard } from '@/components/MovieCard';
import { Pagination } from '@/components/Pagination';
import { MovieDetailsModal } from '@/components/MovieDetailsModal';
import { LoadingCards, ErrorMessage, EmptyState } from '@/components/LoadingAndError';

export default function Home() {
  const {
    movies,
    loading,
    error,
    pagination,
    updateFilters,
    goToPage,
  } = useMovieSearch();

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const showResults = movies.length > 0 || error;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🎬 MovieFinder
            </h1>
            <p className="text-lg text-gray-600">
              Discover movies and TV series with our powerful search engine
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <section className="mb-8">
          <SearchBar 
            onSearch={updateFilters} 
            loading={loading}
          />
        </section>

        {/* Results Section */}
        {showResults && (
          <section>
            {/* Results Header */}
            {movies.length > 0 && (
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h2>
                <span className="text-sm text-gray-600">
                  {pagination.totalResults.toLocaleString()} results found
                </span>
              </div>
            )}

            {/* Loading State */}
            {loading && <LoadingCards />}

            {/* Error State */}
            {error && !loading && (
              <ErrorMessage 
                message={error}
                onRetry={() => window.location.reload()}
              />
            )}

            {/* Empty State */}
            {!loading && !error && movies.length === 0 && showResults && (
              <EmptyState />
            )}

            {/* Movies Grid */}
            {!loading && movies.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onClick={handleMovieClick}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  pagination={pagination}
                  onPageChange={goToPage}
                  loading={loading}
                />
              </>
            )}
          </section>
        )}

        {/* Welcome Message */}
        {!showResults && (
          <section className="text-center py-16">
            <div className="mb-8">
              <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 6v10h6V6H9z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to MovieFinder
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Search through millions of movies and TV series. Use the search bar above to get started!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Search</h3>
                <p className="text-gray-600">Find movies and TV series by title with intelligent search results</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Filters</h3>
                <p className="text-gray-600">Filter by type (movie/series) and year to find exactly what you want</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Info</h3>
                <p className="text-gray-600">Click on any movie to see detailed information, cast, plot, and ratings</p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetailsModal
          imdbID={selectedMovie.imdbID}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>Powered by <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OMDb API</a></p>
            <p className="mt-2">Built with Next.js, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
