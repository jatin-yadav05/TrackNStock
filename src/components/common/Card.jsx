import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  title,
  subtitle,
  isLoading = false,
  headerAction,
  footer,
  noPadding = false,
  ...props
}) => {
  if (isLoading) {
    return (
      <div
        className={`bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm ${className}`}
        {...props}
      >
        <div className="p-6 space-y-4 animate-pulse">
          <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={`bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm ${className}`}
      {...props}
    >
      {(title || headerAction) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        </div>
      )}
      
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>

      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          {footer}
        </div>
      )}
    </motion.div>
  );
};

export default Card; 