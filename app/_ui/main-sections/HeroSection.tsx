import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => (
    <div className="overflow-hidden py-18 sm:py-16" id='start'>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex flex-row max-w-2xl sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 h-[600px]">
          <div className="lg:pr-8 lg:pt-4 md:w-[50%] sm:w-[100%] h-[100%] content-center md:pr-8" >
            <div className="lg:max-w-lg">
              <div className="relative rounded-full px-3 py-1 text-sm/6 text-slate-600 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
                Новый стандарт заботы о вашем питомце.{' '}
                <Link href="#" className="font-semibold text-amber-600">
                  <span aria-hidden="true" className="absolute inset-0" />
                  Узнайте больше <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <h1 className="mt-8 text-pretty text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Уютная гостиница для ваших собак
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-slate-500 sm:text-xl/8">
                Заботимся о вашем питомце, как о своем. Комфортные условия, круглосуточный уход и индивидуальный подход.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="#"
                  className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                  Забронировать место
                </Link>
                <Link href="#" className="text-sm/6 font-semibold text-slate-900">
                  Узнайте больше <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <div className='hidden md:block w-[50%]'>
            <div className="relative min-h-[40rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
              <div className="absolute inset-x-5 bottom-0 top-10 overflow-hidden rounded-[4cqw] bg-slate-900 shadow-xl">
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
        </div>
      </div>
    </div>
  )

export default HeroSection;