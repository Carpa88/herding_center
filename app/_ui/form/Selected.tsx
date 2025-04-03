const Selected = ({
  label,
  name,
  options,
  errors,
  autoComplete,
  col,
}: {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  errors?: (string | number | boolean)[];
  autoComplete?: string;
  col?: 2;
}) => (
  <div className={`md:col-span-${col ?? 1}`}>
    <label
      htmlFor={name}
      className="block text-sm/6 font-medium text-textPrimary"
    >
      {label}
    </label>
    <div className="mt-2 grid grid-cols-1">
      <select
        id={name}
        name={name}
        autoComplete={autoComplete || name}
        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-bgDefault py-1.5 pr-8 pl-3 text-base text-textPrimary outline-1 -outline-offset-1 outline-buttonDefault focus:outline-2 focus:-outline-offset-2 focus:outline-buttonHover sm:text-sm/6 border border-gray-300 focus:ring-buttonHover focus:border-buttonHover"
      >
        {options.map(item => (
          <option
            className="focus:bg-bgSoft"
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
      {Array.isArray(errors) &&
        errors.map(error => (
          <p className="mt-2 text-sm text-red-500" key={error.toString()}>
            {error}
          </p>
        ))}
    </div>
  </div>
);

export default Selected;
