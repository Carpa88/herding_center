import Image from 'next/image';

const VisualsSection = () => (
  <div className="py-24 sm:py-16">
    <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-center text-base/7 font-semibold text-textDisabled">
        Забота и безопасность
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-textPrimary sm:text-5xl">
        Все, что надо вашему питомцу, у нас есть
      </p>
      <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
        <div className="relative lg:row-span-2">
          <div className="absolute inset-px rounded-lg bg-bgDefault lg:rounded-l-[2rem]" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
            <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
              <p className="mt-2 text-lg font-medium tracking-tight text-textPrimary max-lg:text-center">
                Безопасность
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-textSecondary max-lg:text-center">
                Самое важное для нас - безопасность вашего питомца. Он же член
                семьи.
              </p>
            </div>
            <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
              <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-borderDark bg-slate-900 shadow-2xl">
                <Image
                  width={500}
                  height={500}
                  className="size-full object-cover object-top"
                  src="/herding.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]" />
        </div>
        <div className="relative max-lg:row-start-1">
          <div className="absolute inset-px rounded-lg bg-bgDefault max-lg:rounded-t-[2rem]" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
              <p className="mt-2 text-lg font-medium tracking-tight text-textPrimary max-lg:text-center">
                Вкусная еда
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-textSecondary max-lg:text-center">
                Да, ваш малыш будет накормлен, как у бабушки на каникулах.
              </p>
            </div>
            <div className="relative min-h-[15rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
              <div className="absolute inset-x-0 bottom-0 top-10 overflow-hidden rounded-t-[4cqw] bg-slate-900 shadow-2xl">
                <Image
                  width={500}
                  height={500}
                  className="w-full max-lg:max-w-xs"
                  src="/herding.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]" />
        </div>
        <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
          <div className="absolute inset-px rounded-lg bg-bgDefault" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
              <p className="mt-2 text-lg font-medium tracking-tight text-textPrimary max-lg:text-center">
                И спинку почешим
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-textSecondary max-lg:text-center">
                Конечно, а куда же без этого
              </p>
            </div>
            <div className="relative min-h-[15rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
              <div className="absolute inset-x-0 bottom-0 top-10 overflow-hidden rounded-t-[4cqw] bg-bgDarkShadow shadow-2xl">
                <Image
                  width={500}
                  height={500}
                  className="w-full max-lg:max-w-xs"
                  src="/herding.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
        </div>
        <div className="relative lg:row-span-2">
          <div className="absolute inset-px rounded-lg bg-bgDefault max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
            <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
              <p className="mt-2 text-lg font-medium tracking-tight text-textPrimary max-lg:text-center">
                Вы боитесь, что питомец не захочет возвращаться домой?
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-textSecondary max-lg:text-center">
                Так и будет.
              </p>
            </div>
            <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
              <div className="absolute inset-x-5 bottom-0 top-10 overflow-hidden rounded-t-[4cqw] bg-slate-900 shadow-2xl">
                <Image
                  width={500}
                  height={500}
                  className="size-full object-cover object-top"
                  src="/herding.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
        </div>
      </div>
    </div>
  </div>
);
export default VisualsSection;
