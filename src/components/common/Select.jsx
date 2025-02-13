import React, { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  error,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  required = false,
  disabled = false,
  multiple = false,
  helperText,
  ...props
}, ref) => {
  const baseSelectClasses = `
    block w-full rounded-lg border-gray-300 shadow-sm
    focus:border-purple-500 focus:ring-purple-500
    disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
    dark:border-gray-600 dark:bg-gray-700 dark:text-white
    dark:focus:border-purple-500 dark:focus:ring-purple-500
    dark:disabled:bg-gray-800 dark:disabled:text-gray-400
  `;

  const errorSelectClasses = `
    border-red-300 text-red-900
    focus:border-red-500 focus:ring-red-500
    dark:border-red-600 dark:text-red-400
    dark:focus:border-red-500 dark:focus:ring-red-500
  `;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          value={value}
          onChange={onChange}
          multiple={multiple}
          className={`
            ${baseSelectClasses}
            ${error ? errorSelectClasses : ''}
          `}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${props.id || props.name}-error` : undefined
          }
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {error && (
        <p
          className="mt-2 text-sm text-red-600 dark:text-red-400"
          id={`${props.id || props.name}-error`}
        >
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;

// Example usage:
// const options = [
//   { value: 'option1', label: 'Option 1' },
//   { value: 'option2', label: 'Option 2', disabled: true },
//   { value: 'option3', label: 'Option 3' },
// ]; 