import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };

  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    primary: 'bg-black text-white dark:bg-white dark:text-black',
    secondary: 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100',
    success: 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900',
    danger: 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800',
    warning: 'bg-gray-700 text-white dark:bg-gray-300 dark:text-gray-700',
    info: 'bg-gray-600 text-white dark:bg-gray-400 dark:text-gray-600',
  };

  return (
    <span
      className={`
        ${baseClasses}
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

export const StatusBadge = ({ status, ...props }) => {
  const statusVariants = {
    'pending': 'warning',
    'processing': 'info',
    'in-transit': 'primary',
    'delivered': 'success',
    'cancelled': 'danger',
    'in-stock': 'success',
    'low-stock': 'warning',
    'out-of-stock': 'danger',
    'paid': 'success',
    'unpaid': 'danger',
    'refunded': 'info',
  };

  const statusLabels = {
    'pending': 'Pending',
    'processing': 'Processing',
    'in-transit': 'In Transit',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled',
    'in-stock': 'In Stock',
    'low-stock': 'Low Stock',
    'out-of-stock': 'Out of Stock',
    'paid': 'Paid',
    'unpaid': 'Unpaid',
    'refunded': 'Refunded',
  };

  return (
    <Badge
      variant={statusVariants[status] || 'default'}
      {...props}
    >
      {statusLabels[status] || status}
    </Badge>
  );
};

export default Badge; 