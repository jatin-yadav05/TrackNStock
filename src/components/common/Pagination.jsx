import React from 'react';
import { motion } from 'framer-motion';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems,
  pageSizeOptions = [10, 25, 50, 100],
  showPageSize = true,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisible, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    onPageSizeChange(newSize);
    // Reset to first page when changing page size
    onPageChange(1);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      {/* Page size selector and info */}
      <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
        {showPageSize && (
          <label className="flex items-center">
            <span className="mr-2">Show</span>
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="form-select rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="ml-2">entries</span>
          </label>
        )}
        
        <div className="ml-4">
          Showing{' '}
          <span className="font-medium">
            {Math.min((currentPage - 1) * pageSize + 1, totalItems)}
          </span>{' '}
          to{' '}
          <span className="font-medium">
            {Math.min(currentPage * pageSize, totalItems)}
          </span>{' '}
          of <span className="font-medium">{totalItems}</span> results
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between sm:justify-end mt-4 sm:mt-0">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {/* Previous button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`
              relative inline-flex items-center px-2 py-2 rounded-l-md border
              text-sm font-medium
              ${
                currentPage === 1
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }
              border-gray-300 dark:border-gray-600
            `}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>

          {/* Page numbers */}
          {getPageNumbers().map((page) => (
            <motion.button
              key={page}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(page)}
              className={`
                relative inline-flex items-center px-4 py-2 border text-sm font-medium
                ${
                  currentPage === page
                    ? 'z-10 bg-purple-50 dark:bg-purple-900 border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }
              `}
            >
              {page}
            </motion.button>
          ))}

          {/* Next button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`
              relative inline-flex items-center px-2 py-2 rounded-r-md border
              text-sm font-medium
              ${
                currentPage === totalPages
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }
              border-gray-300 dark:border-gray-600
            `}
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;

// Example usage:
// const [currentPage, setCurrentPage] = useState(1);
// const [pageSize, setPageSize] = useState(10);
// const totalItems = 100;
// const totalPages = Math.ceil(totalItems / pageSize);
//
// <Pagination
//   currentPage={currentPage}
//   totalPages={totalPages}
//   onPageChange={setCurrentPage}
//   pageSize={pageSize}
//   onPageSizeChange={setPageSize}
//   totalItems={totalItems}
// /> 