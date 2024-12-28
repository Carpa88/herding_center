import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Search = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Поиск
      </label>
      <input
        className="peer block w-full rounded-md border border-slate-200 py-[9px] pl-10 text-sm outline-none focus:ring-2 focus:ring-slate-500 placeholder:text-slate-500"
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500 peer-focus:text-slate-900" />
    </div>
  );
};

export default Search;
