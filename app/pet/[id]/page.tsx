import { authConfig } from '@app/_configs/auth';
import PageCover from '@app/_ui/PageCover';
import { getServerSession } from 'next-auth';
import React from 'react';
import Image from 'next/image';
import { Props } from '@app/_lib/types';
import { getPet } from '../actions';
import { IMAGE, PET_SEX } from '../consts';
import { Item } from '@app/_ui/Item';
import ButtonBlock from './ButtonsBlock';

const Pet = async ({ params }: Props) => {
  const session = await getServerSession(authConfig);
  const { id } = await params;
  const pet = await getPet(id, session?.user.id || '1');

  return (
    <PageCover title={pet?.data?.name || 'Наш друг'}>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div>
          <div className="mt-6 border-t border-bgSuperLight">
            <dl className="divide-y divide-bgSoft">
              <Item
                name="Полное имя:"
                value={pet.data?.name || 'Мой лучший друг'}
              />
              <Item
                name="Порода:"
                value={pet.data?.breed || 'Питомец для любви'}
              />
              <Item
                name="Год рождения:"
                value={pet.data?.birth_year.toString() || 'Не понятно'}
              />
              <Item
                name="Кавалер или дама?"
                value={
                  PET_SEX.filter(item => item.value === pet?.data?.sex)[0].label
                }
              />
            </dl>
          </div>
          <ButtonBlock id={id} />
        </div>
        <Image
          alt="Product screenshot"
          src={IMAGE}
          width={2432}
          height={1442}
          className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
        />
      </div>
    </PageCover>
  );
};

export default Pet;
