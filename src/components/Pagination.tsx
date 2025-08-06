import { PaginationInfo } from '@/types/movie';

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  loading: boolean;
}

export const Pagination = ({ pagination, onPageChange, loading }: PaginationProps) => {
  const { currentPage, totalPages, totalResults, hasNextPage, hasPrevPage } = pagination;

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show current page and surrounding pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Results Info */}
      <div className="text-sm text-gray-600">
        Showing page {currentPage} of {totalPages} ({totalResults.toLocaleString()} results)
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage || loading}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>

        {/* Page Numbers */}
        <div className="flex">
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={loading || typeof page === 'string'}
              className={`px-3 py-2 text-sm font-medium border-t border-b transition-colors ${
                page === currentPage
                  ? 'bg-blue-600 text-white border-blue-600'
                  : typeof page === 'string'
                  ? 'bg-white text-gray-300 border-gray-300 cursor-default'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              } ${
                index === 0 ? 'border-l' : ''
              } ${
                index === pageNumbers.length - 1 ? 'border-r' : ''
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage || loading}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>

      {/* Quick Jump (for mobile) */}
      <div className="sm:hidden">
        <select
          value={currentPage}
          onChange={(e) => onPageChange(Number(e.target.value))}
          disabled={loading}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              Page {page}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
