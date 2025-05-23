'use client';

import { userNavigation } from '@app/_lib/consts';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from '@node_modules/next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Session } from '@node_modules/next-auth/core/types';

const ProfileNavFullScreen = ({ session }: { session: Session | null }) => (
  <div className="ml-4 flex items-center md:ml-6">
    {session?.user.id ? (
      <Link
        href="/profile"
        className="text-textDefault underline underline-offset-2 hover:text-textDisabled"
      >
        {session?.user?.name ? session?.user?.name : 'Мой профиль'}
      </Link>
    ) : (
      <>
        <Link
          href="/singup"
          className="mr-3 text-textLight underline underline-offset-2 hover:text-textDisabled"
        >
          Зарегистрироваться
        </Link>
        <Link
          href="/login"
          className="text-textLight underline underline-offset-2 hover:text-textDisabled"
        >
          Войти
        </Link>
      </>
    )}
    {/* Profile dropdown */}
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-bgPrimary text-sm focus:outline-none focus:ring-2 focus:ring-bgDefault focus:ring-offset-2 focus:ring-offset-bgPrimary">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Откройте меню</span>
          {session?.user?.image ? (
            <Image
              alt=""
              src={session.user.image}
              width={100}
              height={100}
              className="size-8 rounded-full"
            />
          ) : (
            <UserCircleIcon className="size-8 rounded-full text-textDefault" />
          )}
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-[12] mt-2 w-48 origin-top-right rounded-md bg-bgDefault py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {session?.user?.email &&
          userNavigation.map(item =>
            item.href === '/signout' ? (
              <MenuItem key={item.name}>
                <Button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full text-start block px-4 py-2 text-sm text-textSecondary data-[focus]:bg-bgSoft data-[focus]:outline-none"
                >
                  {item.name}
                </Button>
              </MenuItem>
            ) : (
              <MenuItem key={item.name}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 text-sm text-textSecondary data-[focus]:bg-bgSoft data-[focus]:outline-none"
                >
                  {item.name}
                </Link>
              </MenuItem>
            ),
          )}
      </MenuItems>
    </Menu>
  </div>
);

export default ProfileNavFullScreen;
