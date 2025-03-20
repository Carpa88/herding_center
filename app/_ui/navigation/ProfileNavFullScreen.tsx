import { user, userNavigation } from '@app/_lib/consts';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from '@node_modules/next/link';
import Image from 'next/image';

const ProfileNavFullScreen = ({ isAuthorized }: { isAuthorized: boolean }) => (
  <div className="ml-4 flex items-center md:ml-6">
    {/* Profile dropdown */}
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-bgPrimary text-sm focus:outline-none focus:ring-2 focus:ring-bgDefault focus:ring-offset-2 focus:ring-offset-bgPrimary">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Откройте меню</span>
          {user.imageUrl ? (
            <Image alt="" src={user.imageUrl} className="size-8 rounded-full" />
          ) : (
            <UserCircleIcon className="size-8 rounded-full text-textDefault" />
          )}
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-[12] mt-2 w-48 origin-top-right rounded-md bg-bgDefault py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {isAuthorized ? (
          userNavigation.map(item => (
            <MenuItem key={item.name}>
              <Link
                href={item.href}
                className="block px-4 py-2 text-sm text-textSecondary data-[focus]:bg-bgSoft data-[focus]:outline-none"
              >
                {item.name}
              </Link>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <Link
              href="/login"
              className="block px-4 py-2 text-sm text-textSecondary data-[focus]:underline underline-offset-1"
            >
              Войти
            </Link>
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  </div>
);

export default ProfileNavFullScreen;
