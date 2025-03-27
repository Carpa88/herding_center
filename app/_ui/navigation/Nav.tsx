import { Disclosure } from '@headlessui/react';
import Logo from '@app/_ui/Logo';
import FullScreenNav from './FullScreenNav';
import ProfileNavFullScreen from './ProfileNavFullScreen';
import MubileMenuButton from './MubileMenuButton';
import MobileNavigation from './MobileNavigation';
import { getServerSession } from 'next-auth/next';
import { authConfig } from '@app/_configs/auth';
import { headers } from '@node_modules/next/headers';

const Nav = async () => {
  const pathname = (await headers()).get('x-next-url');
  const session = await getServerSession(authConfig);
  return (
    <Disclosure as="nav" className="bg-bgPrimary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
            <FullScreenNav pathname={pathname || ''} />
          </div>
          <div className="hidden md:block">
            <ProfileNavFullScreen session={session} />
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile version */}
            <MubileMenuButton />
          </div>
        </div>
      </div>
      <MobileNavigation pathname={pathname || ''} session={session} />
    </Disclosure>
  );
};

export default Nav;
