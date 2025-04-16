import { PlusIcon } from '@node_modules/@heroicons/react/24/outline';
import Link from '@node_modules/next/link';

const Title = ({
  title,
  href,
  name,
  plus = true,
}: {
  title: string;
  href?: string;
  name?: string;
  plus?: boolean;
}) => (
  <header className="relative z-10 bg-bgDefault shadow">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
      <h1 className={'text-3xl font-bold tracking-tight text-textPrimary'}>
        {title}
      </h1>
      {href && (
        <Link
          href={href}
          className="flex h-10 items-center rounded-lg bg-buttonDefault px-4 text-sm font-medium text-textDefault transition-colors hover:bg-buttonHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-buttonActive"
        >
          <span className="hidden md:block">{name}</span>{' '}
          {plus && <PlusIcon className="h-5 md:ml-4" />}
        </Link>
      )}
    </div>
  </header>
);

export default Title;
