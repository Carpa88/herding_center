'use server';

import { API_BASE_URL } from '@app/_lib/consts';
import { IFormState, IResponseData } from '@app/_lib/types';
import { ERROR_MES_REQUEST } from '@app/trials/consts';
import { ISinginError, IUser, SignupSchema } from './types';
import bcrypt from 'bcrypt';
import { sql } from '@node_modules/@vercel/postgres/dist';

export const getUser = async (email: string): Promise<IUser | undefined> => {
  try {
    const user = await sql<IUser>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error(
      'Введенные данные не совпадают с записью в базе данных',
      error,
    );
    throw new Error('Failed to fetch user.');
  }
};

export const signup = async (
  prevState: IFormState<ISinginError>,
  formData: FormData,
): Promise<IResponseData<string, ISinginError>> => {
  const validatedFields = SignupSchema.safeParse({
    email: formData.get('email') ?? '',
    password: formData.get('password') ?? '',
    confirmPassword: formData.get('confirmPassword') ?? '',
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
    console.error('response', response);
    if (!response.ok) {
      const { message, error } = await response.json();
      return {
        error,
        message,
        data: null,
      };
    }
    const answer = await response.json();
    // await signIn('credentials', formData);
    // const data: string = await response.json();
    return {
      error: answer.error,
      message: answer.message,
      data: answer.data,
    };
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      error: prevState.error,
      message: ERROR_MES_REQUEST,
      data: JSON.stringify(formData),
    };
  }
};
