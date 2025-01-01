import { ClockIcon, HeartIcon, HomeIcon, SunIcon, UserCircleIcon, VideoCameraIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Уютные номера',
    description:
      'Индивидуальные комнаты для каждого питомца с мягкими лежанками, игрушками и комфортной атмосферой.',
    icon: HomeIcon, // Используйте подходящий икон компонент, например, из Heroicons
  },
  {
    name: 'Круглосуточный уход',
    description:
      'Наши сотрудники заботятся о вашем питомце 24/7, чтобы он чувствовал себя как дома.',
    icon: ClockIcon,
  },
  {
    name: 'Видеонаблюдение',
    description:
      'Следите за своим питомцем через камеры наблюдения в режиме реального времени прямо со своего телефона.',
    icon: VideoCameraIcon,
  },
  {
    name: 'Прогулки на свежем воздухе',
    description:
      'Ежедневные прогулки и игры на закрытой территории, чтобы питомец оставался активным и счастливым.',
    icon: SunIcon,
  },
  {
    name: 'Ветеринарный контроль',
    description:
      'Круглосуточный доступ к ветеринару для обеспечения здоровья и безопасности вашего питомца.',
    icon: HeartIcon,
  },
  {
    name: 'Индивидуальный подход',
    description:
      'Мы учитываем предпочтения каждого питомца: режим питания, любимые игры и другие привычки.',
    icon: UserCircleIcon,
  },
];

const Features = () => (
    <div className="bg-white py-24 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/5 font-semibold text-amber-600">Любовь и забота</h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-balance">
            Все, что нужно для счастья вашего питомца
          </p>
          <p className="mt-6 text-lg/8 text-slate-600">
            Мы создаем комфортные условия для вашего четвероногого друга, чтобы он чувствовал себя как дома. Индивидуальный 
            уход, ежедневные прогулки, игры и круглосуточная поддержка. Вы можете быть уверены, что ваш питомец в надежных 
            руках.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-slate-900">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-amber-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-slate-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )

export default Features;
