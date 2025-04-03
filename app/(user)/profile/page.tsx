'use client';

import PageCover from '@app/_ui/PageCover';
import Link from '@node_modules/next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { CreateButton } from '@app/_ui/buttons';

const pits = [
  {
    id: '465243',
    name: 'Lucky',
    breed: 'Border-coli',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '05243',
    name: 'Fly',
    breed: 'Border-coli',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '46593',
    name: 'Oська',
    breed: 'Border-coli',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '43',
    name: 'Четвертый',
    breed: 'Border-coli',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const Profile = () => {
  const { data: session } = useSession();
  return (
    <PageCover title={session?.user?.name || 'Минуточку...'}>
      <div className="mx-auto grid w-full gap-20 px-6 lg:px-8">
        <div className="max-w-[1000px]">
          <div className="flex justify-end">
            <CreateButton href="pet/new" name="Добавить питомца" />
          </div>
          <p className="mt-6 text-lg/8 text-textSecondary">
            Мы рады снова видеть тебя здесь. Хочешь посоревноваться? Скоро
            пройдёт замечательное{' '}
            <Link
              className="text-buttonDefault underline underline-offset-3 hover:text-buttonHover"
              href={'/trials/latest'}
            >
              соревнование
            </Link>
            , которое точно принесёт тебе удовольствие. Или ты хочешь немного
            отдохнуть? Не волнуйся о друге — всё будет замечательно. Мы
            поиграем, поедим, помоемся, даже вместе погрустим, а потом снова
            поиграем. Наша{' '}
            <Link
              className="text-buttonDefault underline underline-offset-3 hover:text-buttonHover"
              href={'/hotel'}
            >
              гостиница для питомцев
            </Link>{' '}
            ориентирована на безопасность и комфорт твоих друзей.
          </p>
        </div>
        <div className="mx-auto w-full ">
          <dl className="grid w-full sm:grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
            {pits.map(pet => (
              <Link key={pet.id} href={`/pet/${pet.id}`}>
                <div className="bg-bgSoft rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                  <div className="relative w-full h-60">
                    <Image
                      src={pet.image}
                      alt={pet.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-textPrimary">
                      {pet.name}
                    </h3>
                    <p className="text-sm text-textDisabled">{pet.breed}</p>
                    <p className="text-sm text-textSecondary">{pet.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </dl>
        </div>
      </div>
    </PageCover>
  );
};

export default Profile;
