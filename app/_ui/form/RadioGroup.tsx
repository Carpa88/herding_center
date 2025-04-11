import React from 'react';
import { Option } from '@app/pet/types';
import clsx from 'clsx';

export const RadioGroup = ({
  name,
  options,
  selectedValue,
  onChange,
  label,
  cols,
  errors,
}: {
  name: string;
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  label: string;
  cols?: 1 | 2;
  errors?: (string | number | boolean)[];
}) => (
  <div className={`md:col-span-${cols ?? 1}`}>
    <p className="font-medium mb-2 text-textPrimary">{label}</p>
    <div className="flex flex-col gap-2 sm:flex-row">
      {options.map(option => {
        const isSelected = selectedValue === option.value;

        return (
          <label
            key={option.value}
            className={clsx(
              'cursor-pointer rounded-md px-4 py-3 text-center text-sm font-medium border',
              'transition-all duration-150',
              isSelected
                ? 'bg-buttonHover text-white border-buttonHover'
                : 'bg-white text-textPrimary border-gray-300 hover:border-buttonHover hover:bg-slate-100',
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        );
      })}
    </div>
    {Array.isArray(errors) &&
      errors.map(error => (
        <p className="mt-2 text-sm text-red-500" key={error.toString()}>
          {error}
        </p>
      ))}
  </div>
);

export default RadioGroup;
