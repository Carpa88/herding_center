import React from 'react'

const TextAria = ({
  name,
  label,
  col = 1,
  errors,
}: {
  name: string;
  label?: string;
  type?: 'text' | 'number' | 'email';
  col?: 1 | 2;
  errors?: (string | number | boolean)[];
  defaultValue?: string | number | readonly string[];
}) => {
  return (
    <div className={`md:col-span-${col}`}>
      <label htmlFor={name} className="block text-sm/6 font-semibold text-slate-900">
        {label}
      </label>
      <div className="mt-2.5">
        <textarea
          id={name}
          name={name}
          rows={4}
          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600"
          defaultValue={''}
        />
        {!!errors?.length && errors.map((error )=> (<p className="mt-2 text-sm text-red-500" key='error'>{error}</p>))}
      </div>
    </div>
  )
}

export default TextAria