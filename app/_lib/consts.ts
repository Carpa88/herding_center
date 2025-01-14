import { INavigation } from "./types";

export const API_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/`;

export const user = {
  name: 'Катя Катусова',
  email: 'tom@example.com',
  imageUrl: ''
    };

export const navigation: INavigation[] = [
  { name: 'Пастухи Беларуси', href: '/' },
  // { name: 'Гостиница для собак', href: '/hostel' },
  // { name: 'Тренировки', href: '/practices' },
  { name: 'Соревнования', href: '/trials' },
  // { name: 'Уроки', href: '/lessons' },
];

export const userNavigation = [
  { name: 'Ваш профиль', href: '#' },
  { name: 'Настройки', href: '#' },
  { name: 'Выйти', href: '#' },
];

export const initialState= <T>(obj:T) => ({
  errors: obj,
  message: '',
});