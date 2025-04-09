'use server';

import { API_BASE_URL } from '@app/_lib/consts';
import {
  ERRORS,
  IFormState,
  IResponseData,
  TypeRequest,
} from '@app/_lib/types';
import { ERROR_MES_REQUEST } from '@app/trials/consts';
import {
  FullProfile,
  FullProfileError,
  ISinginError,
  IUser,
  ProfileSchema,
  SignupSchema,
  TakenUser,
} from './types';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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
  prevState: IFormState<TakenUser, ISinginError>,
  formData: FormData,
): Promise<IResponseData<TakenUser, ISinginError>> => {
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
    if (!response.ok) {
      const { message, error } = await response.json();
      return {
        error,
        message,
        data: null,
      };
    }
    const answer = await response.json();

    return {
      error: answer.error,
      message: answer.message,
      data: { password, ...answer.data },
    };
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      error: error as Error,
      message: ERROR_MES_REQUEST,
      data: null,
    };
  }
};

export const getProfile = async (
  user_id: string,
): Promise<IResponseData<FullProfile, string | Error>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile/${user_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const { message, error } = await response.json();
      return {
        error,
        message,
        data: null,
      };
    }

    const answer = await response.json();
    return answer;
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      error: error as Error,
      message: ERROR_MES_REQUEST,
      data: null,
    };
  }
};

export const setProfile = async (
  state: IFormState<FullProfile, ERRORS<FullProfileError>>,
  formData: FormData,
): Promise<IResponseData<FullProfile, ERRORS<FullProfileError>>> => {
  const validatedFields = ProfileSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    image_url: formData.get('image_url'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: 'Не все поля заполнены корректно',
      data: null,
    };
  }

  const typeRequest: TypeRequest = state.data?.id
    ? {
        url: `${API_BASE_URL}user/profile/${state.data.id}`,
        method: 'PUT',
        body: {
          id: state.data.id,
          user_id: state.data.user_id,
          ...validatedFields.data,
        },
      }
    : {
        url: `${API_BASE_URL}user/profile`,
        method: 'POST',
        body: {
          user_id: state.data?.user_id,
          ...validatedFields.data,
        },
      };

  try {
    const response = await fetch(`${typeRequest.url}`, {
      method: typeRequest.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(typeRequest.body),
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
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: error as Error, message: ERROR_MES_REQUEST, data: null };
  }
  revalidatePath('/profile');
  redirect('/profile');
};
