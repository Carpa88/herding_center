import { INavigation } from './types';

export const API_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/`;

export const ERROR_MES_RESPONSE = 'Ошибка ответа сервера';
export const ERROR_MES_REQUEST = 'Ошибка запроса к серверу';
export const SUCCESS_MESSAGE = 'Все отлично получилось!';

export const user = {
  name: 'Катя Катусова',
  email: 'tom@example.com',
  imageUrl: '',
};

export const navigation: INavigation[] = [
  { name: 'Гостиница для собак', href: '/' },
  // { name: 'Тренировки', href: '/practices' },
  { name: 'Соревнования', href: '/trials' },
  // { name: 'Уроки', href: '/lessons' },
];

export const userNavigation = [
  { name: 'Ваш профиль', href: '/profile' },
  { name: 'Настройки', href: '/settings' },
  { name: 'Выйти', href: '/signout' },
];

export const initialState = {
  error: '',
  message: '',
  data: null,
};
