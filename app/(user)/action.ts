'use server';

import { signIn } from '@/auth';
import { ILoginError, ISinginError, LoginSchema, SignupSchema } from './types';
import { IFormState, IResponseData } from '@app/_lib/types';
import { API_BASE_URL } from '@app/_lib/consts';
import { ERROR_MES_REQUEST } from '@app/trials/consts';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from '@node_modules/next/navigation';

export const authenticate = async (
  prevState: IFormState<ILoginError>,
  formData: FormData,
): Promise<IResponseData<string, ILoginError>> => {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: 'Не все поля заполнены корректно',
      data: null,
    };
  }
  const { email, password } = validatedFields.data;
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      console.error('response', response);
      const message = await response.json();
      return {
        error: 'ошибка',
        message,
        data: null,
      };
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      error: error as Error,
      message: ERROR_MES_REQUEST,
      data: null,
    };
  }
  revalidatePath('/profile');
  redirect('/profile');
};

export const signup = async (
  prevState: IFormState<ISinginError>,
  formData: FormData,
): Promise<IResponseData<string, ISinginError>> => {
  const validatedFields = SignupSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: 'Не все поля заполнены корректно',
      data: null,
    };
  }
  const { email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  const body = { email, password: hashedPassword };
  try {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error('response', response);
      const { message, error } = await response.json();
      return {
        error: error as Error,
        message,
        data: null,
      };
    }
    await signIn('credentials', formData);
    const data: string = await response.json();
    return { error: '', message: '', data };
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: error as Error, message: ERROR_MES_REQUEST, data: null };
  }
};
