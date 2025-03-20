import { DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { navigation, user, userNavigation } from '@app/_lib/consts';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

const MobileNavigation = ({
  pathname,
  isAuthorized,
}: {
  pathname: string;
  isAuthorized: boolean;
}) => (
  <DisclosurePanel className="md:hidden">
    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
      {navigation.map(item => (
        <DisclosureButton
          key={item.name}
          as={Link}
          href={item.href}
          aria-current={item.href === pathname ? 'page' : undefined}
          className={clsx(
            item.href === pathname
              ? 'bg-bgDarkShadow text-bgDefault'
              : 'text-textLight',
            'block rounded-md px-3 py-2 text-base font-medium',
          )}
        >
          {item.name}
        </DisclosureButton>
      ))}
    </div>
    <div className="border-t border-borderDark pb-3 pt-4">
      {isAuthorized ? (
        <>
          <div className="flex items-center px-5">
            <div className="shrink-0">
              {user.imageUrl ? (
                <Image
                  alt=""
                  src={user.imageUrl}
                  className="size-10 rounded-full"
                />
              ) : (
                <UserCircleIcon className="size-8 rounded-full text-textDefault" />
              )}
            </div>
            <div className="ml-3">
              <div className="text-base/5 font-medium text-textDefault">
                {user.name}
              </div>
              <div className="text-sm font-medium text-textSecondary">
                {user.email}
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1 px-2">
            {userNavigation.map(item => (
              <DisclosureButton
                key={item.name}
                as={Link}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-textSecondary"
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </>
      ) : (
        <DisclosureButton
          as={Link}
          href="/login"
          className="block rounded-md px-3 py-2 text-base font-medium text-textPrimary"
        >
          Войти
        </DisclosureButton>
      )}
    </div>
  </DisclosurePanel>
);

export default MobileNavigation;
