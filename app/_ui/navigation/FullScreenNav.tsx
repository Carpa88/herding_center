import { navigation } from '@app/_lib/consts';
import clsx from 'clsx';
import Link from 'next/link';

const FullScreenNav = ({ pathname }: { pathname: string }) => (
  <div className="hidden md:block">
    <div className="ml-10 flex items-baseline space-x-4">
      {navigation.map(item => (
        <Link
          key={item.name}
          href={item.href}
          aria-current={item.href === pathname ? 'page' : undefined}
          className={clsx(
            item.href === pathname
              ? 'border-b-2 border-orange-800 text-white rounded-none'
              : 'text-slate-100 hover:bg-orange-700 hover:text-white',
            'rounded-md px-3 py-2 text-sm font-medium',
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  </div>
);

export default FullScreenNav;
