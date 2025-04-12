const CustomCheckbox = ({
  label,
  name,
  checked,
  onChange,
  errors,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name: string;
  errors?: (string | number | boolean)[];
}) => (
  <>
    {/* скрытый input для отправки значения */}
    <input type="hidden" name={name} value={checked ? 'true' : 'false'} />
    <label
      htmlFor={name}
      className="flex items-center gap-2 w-full cursor-pointer select-none"
    >
      <input
        id={name}
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="peer hidden"
      />
      <span className="block w-5 h-5 rounded bg-bgDefault border border-gray-300 outline outline-1 outline-slate-300 -outline-offset-1 peer-focus:outline-2 peer-focus:-outline-offset-2 peer-focus:outline-buttonHover peer-checked:bg-buttonHover peer-checked:border-buttonHover transition-all duration-150 relative">
        <svg
          className="absolute top-1 left-1 w-3 h-3 text-textDefault opacity-0 peer-checked:opacity-100 transition-opacity duration-150"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <span className="text-base text-textPrimary sm:text-sm/6">{label}</span>
    </label>
    {Array.isArray(errors) &&
      errors.map(error => (
        <p className="mt-2 text-sm text-textError" key={error.toString()}>
          {error}
        </p>
      ))}
  </>
);

export default CustomCheckbox;
