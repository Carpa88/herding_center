import React from 'react';

const Input = ({
  name,
  label,
  type,
  col,
  errors,
  defaultValue
}: {
  name: string;
  label?: string;
  type?: 'text' | 'number' | 'email';
  col?: 2;
  errors?: (string | number | boolean)[];
  defaultValue?: string | number | readonly string[];
}) => {
  return (
    <div className={`md:col-span-${col ?? 1}`}>
        <label
        htmlFor={name}
        className="block text-sm/6 font-medium text-slate-900"
      >
        {label || name}
      </label>
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type || 'text'}
          placeholder={label}
          autoComplete={name}
          defaultValue={defaultValue}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600 sm:text-sm/6"
        />
        {!!errors?.length && errors.map((error )=> (<p className="mt-2 text-sm text-red-500" key='error'>{error}</p>))}
      </div>
    </div>
  );
};

export default Input;
