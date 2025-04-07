'use client';

import { useState } from 'react';

const Input = ({
  name,
  label,
  type,
  col,
  errors,
  defaultValue,
  value = '',
  disabled = false,
  autoComplete,
}: {
  name: string;
  label?: string;
  type?: 'text' | 'number' | 'email' | 'password';
  col?: 2;
  errors?: (string | number | boolean)[];
  defaultValue?: string | number | readonly string[];
  value?: string | number;
  disabled?: boolean;
  autoComplete?: string;
}) => {
  const [inputValue, setInputValue] = useState(value);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div className={`md:col-span-${col ?? 1}`}>
      {!!label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm/6 font-medium text-textPrimary"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type || 'text'}
        placeholder={label}
        autoComplete={autoComplete || name}
        defaultValue={defaultValue}
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-textPrimary outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-textSecondary focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-buttonHover focus:shadow-none focus:ring-buttonHover sm:text-sm/6 border border-gray-300 "
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
      />
      {Array.isArray(errors) &&
        errors.map(error => (
          <p className="mt-2 text-sm text-red-500" key={error.toString()}>
            {error}
          </p>
        ))}
    </div>
  );
};

export default Input;
