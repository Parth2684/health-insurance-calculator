import React from 'react';

type Option = {
  value: string;
  label: string;
};

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label: string;
  id: string;
  error?: string;
  helpText?: string;
  type: string;
  options?: Option[];
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  error,
  helpText,
  type,
  options,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      {type === 'select' && options ? (
        <select
          id={id}
          className={`block w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
            error ? 'border-red-500' : ''
          }`}
          {...props as React.SelectHTMLAttributes<HTMLSelectElement>}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          className={`block w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
            error ? 'border-red-500' : ''
          }`}
          {...props}
        />
      )}
      
      {helpText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helpText}</p>
      )}
      
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};