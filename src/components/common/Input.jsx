import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  type = 'text',
  helperText,
  className = '',
  required = false,
  disabled = false,
  leftIcon,
  rightIcon,
  ...props
}, ref) => {
  const baseInputClasses = `
    block w-full rounded-lg border-gray-300 shadow-sm
    focus:border-purple-500 focus:ring-purple-500
    disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
    dark:border-gray-600 dark:bg-gray-700 dark:text-white
    dark:focus:border-purple-500 dark:focus:ring-purple-500
    dark:disabled:bg-gray-800 dark:disabled:text-gray-400
  `;

  const errorInputClasses = `
    border-red-300 text-red-900 placeholder-red-300
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
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          className={`
            ${baseInputClasses}
            ${error ? errorInputClasses : ''}
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
          `}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${props.id || props.name}-error` : undefined
          }
          {...props}
        />

        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightIcon}
          </div>
        )}
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

Input.displayName = 'Input';

export default Input;

// Specialized input types
export const PasswordInput = forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Input
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      rightIcon={
        <button
          type="button"
          className="text-gray-400 hover:text-gray-500 focus:outline-none"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          )}
        </button>
      }
      {...props}
    />
  );
});

PasswordInput.displayName = 'PasswordInput'; 