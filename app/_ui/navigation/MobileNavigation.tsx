import { DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { navigation, user, userNavigation } from '@app/_lib/consts';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

const MobileNavigation = ({ pathname }: { pathname: string }) => (
  <DisclosurePanel className="md:hidden">
    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
      {navigation.map((item) => (
        <DisclosureButton
          key={item.name}
          as={Link}
          href={item.href}
          aria-current={item.href === pathname ? 'page' : undefined}
          className={clsx(
            item.href === pathname
              ? 'bg-amber-900 text-white'
              : 'text-amber-300 hover:bg-amber-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          )}
        >
          {item.name}
        </DisclosureButton>
      ))}
    </div>
    <div className="border-t border-amber-700 pb-3 pt-4">
      <div className="flex items-center px-5">
        <div className="shrink-0">
          {user.imageUrl ? (
            <Image
              alt=""
              src={user.imageUrl}
              className="size-10 rounded-full"
            />
          ) : (
            <UserCircleIcon className="size-8 rounded-full text-white" />
          )}
        </div>
        <div className="ml-3">
          <div className="text-base/5 font-medium text-white">{user.name}</div>
          <div className="text-sm font-medium text-slate-400">{user.email}</div>
        </div>
        <button
          type="button"
          className="relative ml-auto shrink-0 rounded-full bg-amber-800 p-1 text-amber-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-800"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <BellIcon aria-hidden="true" className="size-6" />
        </button>
      </div>
      <div className="mt-3 space-y-1 px-2">
        {userNavigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as={Link}
            href={item.href}
            className="block rounded-md px-3 py-2 text-base font-medium text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            {item.name}
          </DisclosureButton>
        ))}
      </div>
    </div>
  </DisclosurePanel>
);

export default MobileNavigation;
