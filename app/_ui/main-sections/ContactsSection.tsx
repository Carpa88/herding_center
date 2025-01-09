import { socials } from '@app/_lib/main_const';
import { FaPhoneAlt } from '@node_modules/react-icons/fa';

const ContactsSection = () => {
    return (
      <div className="py-24 sm:py-16" id='contacts'>
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Наши контакты
            </h2>
            <p className="mt-6 text-lg/8 text-slate-600">
              Свяжитесь с нами, чтобы получить подробную информацию, обсудить ваши задачи или узнать о наших услугах. Мы всегда готовы ответить на ваши вопросы!</p>
          </div>
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {socials.map((social, id) => (
              <li key={social.name + id}>
                <div className="flex items-center gap-x-6">
                  <social.icon size={35} className="text-amber-600" /> 
                  <div>
                    <h3 className="text-base/7 font-semibold tracking-tight text-slate-900">{social.name}</h3>
                    <p className="text-sm/6 font-semibold text-amber-600">{social.value}</p> 
                  </div>
                </div>
              </li>
            ))}
            <li key='FaPhoneAlt'>
                <div className="flex items-center gap-x-6">
                  <FaPhoneAlt size={35} className="text-amber-600" /> 
                  <div>
                    <h3 className="text-base/7 font-semibold tracking-tight text-slate-900">Катусова Катерина</h3>
                    <a href='+375297551860' className="text-sm/6 font-semibold text-amber-600">+375-29-755-1860</a>
                  </div>
                </div>
              </li>
          </ul>
        </div>
      </div>
    )
}

export default ContactsSection;
