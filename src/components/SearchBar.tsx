import { useState } from 'react';
import { SearchFilters } from '@/types/movie';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  loading: boolean;
}

export const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'movie' | 'series' | ''>('');
  const [year, setYear] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch({
        query: query.trim(),
        type,
        year,
        page: 1,
      });
    }
  };

  const handleReset = () => {
    setQuery('');
    setType('');
    setYear('');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Search Bar */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="🎬 Search for movies or TV series..."
              className="w-full px-6 py-4 pr-14 text-lg text-black bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl focus:ring-4 focus:ring-blue-500/25 focus:border-blue-500 outline-none transition-all duration-300 shadow-lg hover:shadow-xl placeholder-gray-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Type Filter */}
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'movie' | 'series' | '')}
              className="w-full px-4 py-3 text-black bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-lg focus:ring-3 focus:ring-purple-500/25 focus:border-purple-500 outline-none transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              disabled={loading}
            >
              <option value="">🎭 All Types</option>
              <option value="movie">🎬 Movies</option>
              <option value="series">📺 TV Series</option>
            </select>
          </div>

          {/* Year Filter */}
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
              Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-3 text-black bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-lg focus:ring-3 focus:ring-pink-500/25 focus:border-pink-500 outline-none transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              disabled={loading}
            >
              <option value="">📅 All Years</option>
              {years.slice(0, 50).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 sm:items-end">
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Searching...
                </span>
              ) : (
                '🔍 Search'
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Search Tips */}
        <div className="text-center">
          <p className="text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-lg inline-block">
            💡 <span className="font-medium">Pro tip:</span> Try searching for &quot;Batman&quot;, &quot;Avengers&quot;, or &quot;Game of Thrones&quot;
          </p>
        </div>
      </form>
    </div>
  );
};
