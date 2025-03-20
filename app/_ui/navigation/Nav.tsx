'use client';

import { Disclosure } from '@headlessui/react';
import Logo from '@app/_ui/Logo';
import { usePathname } from 'next/navigation';
import FullScreenNav from './FullScreenNav';
import ProfileNavFullScreen from './ProfileNavFullScreen';
import MubileMenuButton from './MubileMenuButton';
import MobileNavigation from './MobileNavigation';

const Nav = () => {
  const pathname = usePathname();
  const isAuthorized = false;

  return (
    <Disclosure as="nav" className="bg-bgPrimary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
            <FullScreenNav pathname={pathname} />
          </div>
          <div className="hidden md:block">
            <ProfileNavFullScreen isAuthorized={isAuthorized} />
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile version */}
            <MubileMenuButton />
          </div>
        </div>
      </div>
      <MobileNavigation pathname={pathname} isAuthorized={isAuthorized} />
    </Disclosure>
  );
};

export default Nav;
