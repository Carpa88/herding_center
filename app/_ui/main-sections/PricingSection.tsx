import { tiers } from '@app/_lib/main_const';
import { CheckIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx';

const PricingSection = () => {
  return (
    <div className="relative isolate px-6 py-24 sm:py-16 lg:px-8" id='prices'>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-amber-600">Цены</h2>
        <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
          Выберите подходящий план для вас
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-slate-600 sm:text-xl/8">
        Выберите доступный тарифный план, который включает в себя лучшие функции для вас.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={clsx(
              tier.featured ? 'relative bg-amber-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
              tier.featured
                ? ''
                : tierIdx === 0
                  ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                  : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
              'rounded-3xl p-8 ring-1 ring-slate-900/10 sm:p-10',
            )}
          >
            <h3
              id={tier.id}
              className={clsx(tier.featured ? 'text-amber-400' : 'text-amber-600', 'text-base/7 font-semibold')}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={clsx(
                  tier.featured ? 'text-white' : 'text-slate-900',
                  'text-5xl font-semibold tracking-tight',
                )}
              >
                {tier.priceMonthly}
              </span>
              <span className={clsx(tier.featured ? 'text-slate-400' : 'text-slate-500', 'text-base')}>{tierIdx === 0 ?'/day' : '/month'}</span>
            </p>
            <p className={clsx(tier.featured ? 'text-slate-300' : 'text-slate-600', 'mt-6 text-base/7')}>
              {tier.description}
            </p>
            <ul
              role="list"
              className={clsx(
                tier.featured ? 'text-slate-300' : 'text-slate-600',
                'mt-8 space-y-3 text-sm/6 sm:mt-10',
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={clsx(tier.featured ? 'text-amber-400' : 'text-amber-600', 'h-6 w-5 flex-none')}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={clsx(
                tier.featured
                  ? 'bg-amber-500 text-white shadow-sm hover:bg-amber-400 focus-visible:outline-amber-500'
                  : 'text-amber-600 ring-1 ring-inset ring-amber-200 hover:ring-amber-300 focus-visible:outline-amber-600',
                'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
              )}
            >
              Давай начнем сегодня
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PricingSection;