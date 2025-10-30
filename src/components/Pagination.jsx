import React from 'react';

function Pagination({ currentPage, totalItems, pageSize = 5, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        disabled={!canPrev}
        className={`px-3 py-1 border border-gray-300 rounded-md transition-colors ${canPrev ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'}`}
      >
        ก่อนหน้า
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded-md transition-colors ${
            p === currentPage
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => canNext && onPageChange(currentPage + 1)}
        disabled={!canNext}
        className={`px-3 py-1 border border-gray-300 rounded-md transition-colors ${canNext ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'}`}
      >
        ถัดไป
      </button>
    </div>
  );
}

export default Pagination;