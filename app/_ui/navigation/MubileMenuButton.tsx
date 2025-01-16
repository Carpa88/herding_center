import { DisclosureButton } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const MubileMenuButton = () => (
  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-amber-800 p-2 text-slate-400 hover:bg-amber-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-800">
    <span className="absolute -inset-0.5" />
    <span className="sr-only">Open main menu</span>
    <Bars3Icon
      aria-hidden="true"
      className="block size-6 group-data-[open]:hidden"
    />
    <XMarkIcon
      aria-hidden="true"
      className="hidden size-6 group-data-[open]:block"
    />
  </DisclosureButton>
);

export default MubileMenuButton;
