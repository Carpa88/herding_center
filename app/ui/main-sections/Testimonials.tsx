import { testimonials } from '@app/lib/main_const';
import { ITestimonial } from '@app/lib/main_types';
import Image from 'next/image';

const block_parent = 'box-border p-2'

const TestimonialDlock = ({item, mainBlock=false}: {item: ITestimonial; mainBlock?: boolean}) => (
  <div className='bg-white p-3 my-4 border-2 rounded-lg shadow-lg font-serif text-pretty tracking-tight text-slate-600' id='testimonials' >
    <p className={mainBlock ? 'font-semibold sm:text-sm md:text-lg p-6' : 'text-sm md:text-md'} >{`"${item.testimonial}"`}</p>
    <div className={`flex items-center py-4 ${mainBlock && 'w-full border-t-2'}`}>
      <Image alt="" src={item.icon || '/ava.png'} className="size-10 rounded-full" width={300} height={300}/>
      <div className='pl-4'>
        <h3 className="text-base/7 font-semibold tracking-tight text-slate-900 pb-0">{item.userName}</h3>
        <p className="text-sm/6 text-slate-400 leading-4">{item.userNic || '@user_nick'}</p>
      </div>
    </div>
  </div>
)

const Testimonials = () => {
  return (
    <div className="py-24 sm:py-16" id='testimonials'>
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center pb-11">
          <h2 className="text-base/5 font-semibold text-amber-600">Отзывы</h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-balance">
            Мы работаем с сотнями потрясающих людей
          </p>
        </div>
        <div className='lg:flex flex-row flex-nowrap justify-center hidden md:hidden'>
          <div className={`w-[25%] ${block_parent}`}>
            {testimonials.slice(1, 4).map(item => 
            <TestimonialDlock item={item} key={item.userName} />)}
          </div>
          <div className={`w-[50%] flex-grow-1 ${block_parent}`}>
            <TestimonialDlock item={testimonials[1]} mainBlock />
            <div className='flex flex-row'>
              <div className={`w-[50%] ${block_parent}`}>
                {testimonials.slice(5, 7).map(item => 
                <TestimonialDlock item={item} key={item.userName} />)}
              </div>
              <div className={` w-[50%] ${block_parent}`}>
                {testimonials.slice(7, 9).map(item => 
                <TestimonialDlock item={item} key={item.userName} />)}
              </div>
            </div>
          </div>
          <div className={` w-[25%] ${block_parent}`}>
            {testimonials.slice(-3).map(item => 
            <TestimonialDlock item={item} key={item.userName} />)}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-full px-4 max-md:max-w-2xl max-md:px-6 lg:hidden">
        <TestimonialDlock item={testimonials[1]} mainBlock />
        <div className='md:columns-2 sm:columns-1'>
        {testimonials.slice(1, 6).map(item => 
          <TestimonialDlock item={item} key={item.userName} />)}
        </div>
      </div>
    </div>
  )
}

export default Testimonials