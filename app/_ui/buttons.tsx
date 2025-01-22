import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';

export const CreateButton = ({
  href,
  name,
}: {
  href: string;
  name: string;
}) => (
  <Link
    href={href}
    className="flex h-10 items-center rounded-lg bg-amber-600 px-4 text-sm font-medium text-white transition-colors hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
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
  <Link href={href} className="rounded-md border p-2 hover:bg-amber-100">
    {name && <span className="hidden md:block">{name} </span>}
    <PencilIcon className="w-5" />
  </Link>
);

export const DeleteButton = ({
  onClick,
}: {
  onClick: () => void | Promise<void>;
}) => (
  <button
    onClick={onClick}
    className="rounded-md border p-2 hover:bg-amber-100"
  >
    <span className="sr-only">Delete</span>
    <TrashIcon className="w-5" />
  </button>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, className, ...rest }: ButtonProps) => (
  <button
    {...rest}
    className={clsx(
      'flex h-10 items-center rounded-lg bg-amber-500 px-4 text-sm font-medium text-white transition-colors hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 active:bg-amber-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
      className,
    )}
  >
    {children}
  </button>
);
