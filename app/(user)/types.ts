import { z } from 'zod';

export type UserRoles = 'role' | 'admin';

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: UserRoles;
  created_at?: Date;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginError {
  email: string[];
  password: string[];
}

export interface ISingin {
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ISinginError {
  email: string[];
  password: string[];
  confirmPassword: string[];
}

export type PartialSinginError = Partial<ISinginError>;

export type PartialLoginError = Partial<ILoginError>;

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Электронный адрес обязателен' })
    .email({ message: 'Неверный формат электронного адреса' }),
  password: z
    .string()
    .nonempty({ message: 'Пароль обязателен' })
    .min(6, { message: 'Длина пароля должна быть не менее 6 символов' }),
});

export const SignupSchema = z
  .object({
    email: z
      .string()
      .nonempty({ message: 'Электронный адрес обязателен' })
      .email({ message: 'Неверный формат электронного адреса' }),
    password: z
      .string()
      .nonempty({ message: 'Пароль обязателен' })
      .min(6, { message: 'Длина пароля должна быть не менее 6 символов' }),
    confirmPassword: z
      .string()
      .nonempty({ message: 'Пароль обязателен' })
      .min(6, { message: 'Длина пароля должна быть не менее 6 символов' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'], // Поле, к которому относится ошибка
  });

export interface TakenUser {
  id: string;
  email: string;
  password: string;
  role: string;
}

export interface FullProfile {
  id: string;
  user_id: string;
  user_name?: string;
  phone?: string;
  image_url?: string;
}

export type CreateFullProfile = Omit<FullProfile, 'id'>;

export interface FullProfileError {
  id: string[];
  user_id: string[];
  user_name?: string[];
  phone?: string[];
  image_url?: string[];
}

export type PartialFullProfileError = Partial<FullProfileError>;

export const ProfileSchema = z.object({
  user_name: z.string().refine(val => val === '' || val.length >= 2, {
    message: 'Имя должно содержать не менее 2 символов',
  }),
  phone: z
    .string()
    .max(20, 'Максимум 20 символов')
    .regex(/^\+?\d+$/, 'Допустимы только цифры и знак "+" в начале')
    .refine(val => val === '' || val.length >= 6, {
      message: 'Телефон должен содержать не менее 6 символов',
    })
    .or(z.literal('')),
  image_url: z.string().refine(val => val === '' || val.length >= 6, {
    message: 'URL изображения должен содержать не менее 6 символов',
  }),
});
