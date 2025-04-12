import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
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
    className="flex h-10 items-center rounded-lg bg-buttonDefault px-4 text-sm font-medium text-textDefault transition-colors hover:bg-buttonHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-buttonActive"
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
  <Link href={href} className="rounded-md border p-2 hover:bg-bgSoft">
    {name && <span className="hidden md:block">{name} </span>}
    <PencilIcon className="w-5" />
  </Link>
);

export const DeleteButton = ({
  onClick,
}: {
  onClick: () => void | Promise<void>;
}) => (
  <button onClick={onClick} className="rounded-md border p-2 hover:bg-bgSoft">
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
      'flex h-10 items-center rounded-lg bg-buttonDefault px-4 text-sm font-medium text-textDefault transition-colors hover:bg-buttonHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-buttonActive active:bg-buttonActive aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
      className,
    )}
  >
    {children}
  </button>
);

export const IsActiveButtonIcon = ({ name }: { name?: string }) => (
  <span className="rounded-md border p-2 hover:bg-bgSoft">
    {name && <span className="hidden md:block">{name} </span>}
    <CheckIcon className="w-5" />
  </span>
);
