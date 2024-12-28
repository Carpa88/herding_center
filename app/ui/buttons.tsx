import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const CreateButton = ({
  href,
  name,
}: {
  href: string;
  name: string;
}) => (
  <Link
    href={href}
    className="flex h-10 items-center rounded-lg bg-slate-600 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
  >
    <span className="hidden md:block">{name}</span>{' '}
    <PlusIcon className="h-5 md:ml-4" />
  </Link>
);