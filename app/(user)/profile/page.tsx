'use server';

import PageCover from '@app/_ui/PageCover';
import Link from '@node_modules/next/link';
import { CreateButton } from '@app/_ui/buttons';
import { authConfig } from '@app/_configs/auth';
import { getServerSession } from 'next-auth';
import PetList from './PetList';
import { getPets } from '@app/pet/actions';

const Profile = async () => {
  const session = await getServerSession(authConfig);
  const data = await getPets(session?.user?.id || '1');
  return (
    <PageCover title={session?.user?.name || 'Приветствуем!'}>
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
        {data.data && <PetList data={data.data} />}
      </div>
    </PageCover>
  );
};

export default Profile;
