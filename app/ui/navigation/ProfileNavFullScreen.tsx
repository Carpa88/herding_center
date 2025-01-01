import { user, userNavigation } from '@app/lib/consts';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import {
  BellIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image'

const ProfileNavFullScreen = ({isAuthorized}: {isAuthorized:boolean}) => {
  return (
    <div className="ml-4 flex items-center md:ml-6">
      <button
        type="button"
        className="relative rounded-full bg-amber-800 p-1 text-amber-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-800"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <BellIcon aria-hidden="true" className="size-6" />
      </button>

      {/* Profile dropdown */}
      {isAuthorized ? (
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton className="relative flex max-w-xs items-center rounded-full bg-amber-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              {user.imageUrl ?
              (<Image
                alt=""
                src={user.imageUrl}
                className="size-8 rounded-full"
              />) : (
                <UserCircleIcon className="size-8 rounded-full text-white" />
                
              )}
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                <a
                  href={item.href}
                  className="block px-4 py-2 text-sm text-slate-700 data-[focus]:bg-slate-100 data-[focus]:outline-none"
                >
                  {item.name}
                </a>
              </MenuItem>
            ))}
            </MenuItems>
          </Menu>
        ) : (
          <div className="relative flex max-w-xs items-center rounded-full bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800">
            <UserCircleIcon className="size-8 rounded-full text-white" />
          </div>
        )}
      </div>
    )
  }
          
  export default ProfileNavFullScreen