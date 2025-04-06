'use client';
import Link from 'next/link';
import { deletePet } from '../actions';

const linkStyle =
  'pr-2 text-buttonDefault hover:underline hover:text-buttonHover';
const buttonStyle =
  'px-4 py-3 mr-2 text-buttonDefault outline outline-2 hover:text-buttonHover';

const ButtonBlock = ({ id }: { id: string }) => (
  <div>
    <div className="w-full flex justify-end mb-5">
      <Link href={`${id}/edit`} className={buttonStyle}>
        Редактировать
      </Link>
      <button className={buttonStyle} onClick={() => deletePet(id)}>
        Удалить
      </button>
    </div>
    <div className="flex row-span-1">
      <Link href="#" className={linkStyle}>
        Записаться на соревнование
      </Link>
      <Link href="#" className={linkStyle}>
        Записаться на тренировку
      </Link>
      <Link href="#" className={linkStyle}>
        Отдохнуть в гостинице
      </Link>
    </div>
  </div>
);

export default ButtonBlock;
