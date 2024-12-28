import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
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

export const UpdateButtonIcon = ({
  href,
  name,
}: {
  href: string;
  name?: string;
}) => (
  <Link href={href} className="rounded-md border p-2 hover:bg-slate-100">
    {name && <span className="hidden md:block">{name} </span>}
    <PencilIcon className="w-5" />
  </Link>
);

export const DeleteButton = ({
  onClick,
}: {
  onClick?: () => void | Promise<void>;
}) => {
  return (
    <button
      onClick={onClick}
      className="rounded-md border p-2 hover:bg-slate-100"
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-5" />
    </button>
  );
};