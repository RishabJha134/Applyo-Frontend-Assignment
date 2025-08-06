import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { MovieDetails } from '@/types/movie';
import { OMDbAPI } from '@/services/omdb';

interface MovieDetailsModalProps {
  imdbID: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MovieDetailsModal = ({ imdbID, isOpen, onClose }: MovieDetailsModalProps) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const details = await OMDbAPI.getMovieDetails(imdbID);
      if (details) {
        setMovie(details);
      } else {
        setError('Movie details not found');
      }
    } catch {
      setError('Failed to load movie details');
    } finally {
      setLoading(false);
    }
  }, [imdbID]);

  useEffect(() => {
    if (isOpen && imdbID) {
      fetchMovieDetails();
    }
  }, [isOpen, imdbID, fetchMovieDetails]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Movie Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchMovieDetails}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {movie && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Poster */}
              <div className="md:col-span-1">
                <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
                  {movie.Poster && movie.Poster !== 'N/A' ? (
                    <Image
                      src={movie.Poster}
                      alt={movie.Title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{movie.Title}</h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      movie.Type === 'movie' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {movie.Type === 'movie' ? 'Movie' : 'Series'}
                    </span>
                    <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                      {movie.Year}
                    </span>
                    {movie.imdbRating !== 'N/A' && (
                      <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                        ⭐ {movie.imdbRating}
                      </span>
                    )}
                  </div>
                </div>

                {movie.Plot !== 'N/A' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Plot</h3>
                    <p className="text-gray-700 leading-relaxed">{movie.Plot}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {movie.Director !== 'N/A' && (
                    <div>
                      <h4 className="font-semibold text-gray-900">Director</h4>
                      <p className="text-gray-700">{movie.Director}</p>
                    </div>
                  )}

                  {movie.Actors !== 'N/A' && (
                    <div>
                      <h4 className="font-semibold text-gray-900">Cast</h4>
                      <p className="text-gray-700">{movie.Actors}</p>
                    </div>
                  )}

                  {movie.Genre !== 'N/A' && (
                    <div>
                      <h4 className="font-semibold text-gray-900">Genre</h4>
                      <p className="text-gray-700">{movie.Genre}</p>
                    </div>
                  )}

                  {movie.Runtime !== 'N/A' && (
                    <div>
                      <h4 className="font-semibold text-gray-900">Runtime</h4>
                      <p className="text-gray-700">{movie.Runtime}</p>
                    </div>
                  )}

                  {movie.Released !== 'N/A' && (
                    <div>
                      <h4 className="font-semibold text-gray-900">Released</h4>
                      <p className="text-gray-700">{movie.Released}</p>
                    </div>
                  )}

                  {movie.Country !== 'N/A' && (
                    <div>
                      <h4 className="font-semibold text-gray-900">Country</h4>
                      <p className="text-gray-700">{movie.Country}</p>
                    </div>
                  )}

                  {movie.Language !== 'N/A' && (
                    <div>
                      <h4 className="font-semibold text-gray-900">Language</h4>
                      <p className="text-gray-700">{movie.Language}</p>
                    </div>
                  )}

                  {movie.Writer !== 'N/A' && (
                    <div>
                      <h4 className="font-semibold text-gray-900">Writer</h4>
                      <p className="text-gray-700">{movie.Writer}</p>
                    </div>
                  )}
                </div>

                {movie.Awards !== 'N/A' && (
                  <div>
                    <h4 className="font-semibold text-gray-900">Awards</h4>
                    <p className="text-gray-700">{movie.Awards}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
