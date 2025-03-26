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
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Длина пароля должна быть не менее 6 символов' }),
});

export const SignupSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: 'Длина пароля должна быть не менее 6 символов' }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'], // Поле, к которому относится ошибка
  });
