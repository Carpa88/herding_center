import Select from 'react-select';
import { Option } from '@app/pet/types';

const Selected = ({
  label,
  name,
  options,
  errors,
  col,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: Option[];
  errors?: (string | number | boolean)[];
  col?: 2;
  value?: Option | null;
  onChange?: (option: Option | null) => void;
}) => (
  <div className={`md:col-span-${col ?? 1}`}>
    <label
      htmlFor={name}
      className="block text-sm/6 font-medium text-textPrimary mb-1"
    >
      {label}
    </label>
    <Select
      inputId={name}
      name={name}
      options={options}
      value={value}
      onChange={onChange}
      unstyled
      classNames={{
        control: () =>
          'block w-full rounded-md bg-white px-3 py-1.5 text-base text-textPrimary outline outline-1 -outline-offset-1 outline-slate-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-buttonHover focus:shadow-none focus:ring-buttonHover sm:text-sm/6 border border-gray-300',
        placeholder: () => 'text-textSecondary',
        singleValue: () => 'text-textPrimary',
        menu: () =>
          'z-10 mt-1 rounded-md bg-white shadow-md border border-gray-300',
        option: ({ isFocused, isSelected }) => {
          const base = 'cursor-pointer px-3 py-2 text-sm';
          if (isSelected) {
            return `${base} bg-buttonActive text-white`;
          }
          if (isFocused) {
            return `${base} bg-buttonHover text-white`;
          }
          return `${base} text-textPrimary`;
        },
        dropdownIndicator: () => 'text-gray-500 px-2',
        indicatorSeparator: () => 'hidden',
        valueContainer: () => 'flex gap-2 items-center',
      }}
    />
    {Array.isArray(errors) &&
      errors.map(error => (
        <p className="mt-2 text-sm text-red-500 " key={error.toString()}>
          {error}
        </p>
      ))}
  </div>
);

export default Selected;
