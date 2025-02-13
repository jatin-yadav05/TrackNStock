import React from 'react';
import { motion } from 'framer-motion';

const Table = ({
  columns,
  data,
  onSort,
  sortColumn,
  sortDirection,
  onRowClick,
  selectedRows,
  onSelectRow,
  isLoading,
  emptyMessage = 'No data available',
}) => {
  const renderHeader = () => {
    return (
      <thead className="bg-gray-50 dark:bg-gray-900/50">
        <tr>
          {onSelectRow && (
            <th scope="col" className="px-6 py-3 w-4">
              <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 dark:border-gray-700 rounded text-black dark:text-white focus:ring-black dark:focus:ring-white"
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const allIds = data.map((item) => item.id);
                  onSelectRow(isChecked ? allIds : []);
                }}
                checked={
                  data.length > 0 &&
                  selectedRows?.length === data.length
                }
              />
            </th>
          )}
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                column.sortable ? 'cursor-pointer select-none' : ''
              }`}
              onClick={() => {
                if (column.sortable && onSort) {
                  onSort(column.key);
                }
              }}
            >
              <div className="flex items-center space-x-1">
                <span>{column.label}</span>
                {column.sortable && (
                  <span className="flex flex-col">
                    <svg
                      className={`w-3 h-3 ${
                        sortColumn === column.key && sortDirection === 'asc'
                          ? 'text-black dark:text-white'
                          : 'text-gray-400'
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M7 14l5-5 5 5z"
                      />
                    </svg>
                    <svg
                      className={`w-3 h-3 -mt-1 ${
                        sortColumn === column.key && sortDirection === 'desc'
                          ? 'text-black dark:text-white'
                          : 'text-gray-400'
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M7 10l5 5 5-5z"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderBody = () => {
    if (isLoading) {
      return (
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-black dark:divide-gray-800">
          {[...Array(5)].map((_, index) => (
            <tr key={index}>
              {onSelectRow && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    }

    if (!data.length) {
      return (
        <tbody>
          <tr>
            <td
              colSpan={columns.length + (onSelectRow ? 1 : 0)}
              className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
            >
              {emptyMessage}
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-black dark:divide-gray-800">
        {data.map((row, index) => (
          <motion.tr
            key={row.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className={`
              ${onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900' : ''}
              ${
                selectedRows?.includes(row.id)
                  ? 'bg-gray-50 dark:bg-gray-900'
                  : ''
              }
            `}
            onClick={() => onRowClick?.(row)}
          >
            {onSelectRow && (
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 dark:border-gray-700 rounded text-black dark:text-white focus:ring-black dark:focus:ring-white"
                  checked={selectedRows?.includes(row.id)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    onSelectRow(
                      isChecked
                        ? [...(selectedRows || []), row.id]
                        : (selectedRows || []).filter((id) => id !== row.id)
                    );
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
            )}
            {columns.map((column) => (
              <td
                key={column.key}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
              >
                {column.render ? column.render(row) : row[column.key]}
              </td>
            ))}
          </motion.tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              {renderHeader()}
              {renderBody()}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

// Example usage:
// const columns = [
//   {
//     key: 'name',
//     label: 'Name',
//     sortable: true,
//   },
//   {
//     key: 'status',
//     label: 'Status',
//     render: (row) => <StatusBadge status={row.status} />,
//   },
//   {
//     key: 'actions',
//     label: 'Actions',
//     render: (row) => (
//       <div className="flex space-x-2">
//         <Button size="sm">Edit</Button>
//         <Button size="sm" variant="danger">Delete</Button>
//       </div>
//     ),
//   },
// ]; 