import { navigation } from "@app/lib/consts"
import clsx from "clsx"
import Link from "next/link"

const FullScreenNav = ({pathname}: {pathname: string}) => {
  return (
    <div className="hidden md:block" >
      <div className="ml-10 flex items-baseline space-x-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            aria-current={item.href === pathname ? 'page' : undefined}
            className={clsx(
              item.href === pathname
                ? 'bg-slate-900 text-white'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white',
              'rounded-md px-3 py-2 text-sm font-medium'
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FullScreenNav