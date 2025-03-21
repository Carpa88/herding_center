import { features } from '@app/_lib/main_const';

const Features = () => (
  <div className="py-24 sm:py-16" id="features">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base/5 font-semibold text-textDisabled">
          Любовь и забота
        </h2>
        <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-textPrimary sm:text-5xl lg:text-balance">
          Все, что нужно для счастья вашего питомца
        </p>
        <p className="mt-6 text-lg/8 text-textSecondary">
          Мы создаем комфортные условия для вашего четвероногого друга, чтобы он
          чувствовал себя как дома. Индивидуальный уход, ежедневные прогулки,
          игры и круглосуточная поддержка. Вы можете быть уверены, что ваш
          питомец в надежных руках.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map(feature => (
            <div key={feature.name} className="relative pl-16">
              <dt className="text-base/7 font-semibold text-textDisabled">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-bgDarkShadow">
                  <feature.icon
                    aria-hidden="true"
                    className="size-6 text-textDefault"
                  />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 text-base/7 text-textSecondary">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </div>
);

export default Features;
