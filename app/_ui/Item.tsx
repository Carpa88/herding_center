export const Item = ({
  name,
  value,
}: {
  name: string | number;
  value: string;
}) => (
  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-sm/6 font-medium text-textPrimary">{name}</dt>
    <dd className="mt-1 text-sm/6 text-textSecondary sm:col-span-2 sm:mt-0">
      {value}
    </dd>
  </div>
);
