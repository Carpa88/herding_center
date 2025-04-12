'use server';

import { API_BASE_URL, ERROR_MES_REQUEST } from '@app/_lib/consts';
import { ERRORS, IFormState, IResponseData } from '@app/_lib/types';
import {
  CreateFullProfile,
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
import { fetchErrorJson, fetchResponseCatch } from '@app/_lib/utils';

export const getUser = async (email: string): Promise<IUser | undefined> => {
  try {
    const user = await sql<IUser>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error(
      'Введенные данные не совпадают с записью в базе данных',
      error,
    );
    throw new Error('Не удалось подучить запись');
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
    const result = await fetchErrorJson(response);
    return {
      error: result.error,
      message: result.message,
      data: { ...(result.data as unknown as TakenUser), password },
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

    return fetchErrorJson(response);
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
};

export const createProfile = async (
  body: CreateFullProfile,
): Promise<IResponseData<FullProfile, ERRORS<FullProfileError>>> => {
  try {
    const response = await fetch(`${API_BASE_URL}user/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return fetchErrorJson(response);
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
};

export const editProfile = async (
  body: FullProfile,
): Promise<IResponseData<FullProfile, ERRORS<FullProfileError>>> => {
  try {
    const response = await fetch(`${API_BASE_URL}user/profile/${body.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return fetchErrorJson(response);
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
};

export const setProfile = async (
  state: IFormState<FullProfile, ERRORS<FullProfileError>>,
  formData: FormData,
): Promise<IResponseData<FullProfile, ERRORS<FullProfileError>>> => {
  const validatedFields = ProfileSchema.safeParse({
    name: formData.get('user_name'),
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
  const response = state.data?.id
    ? await editProfile({
        id: state.data.id,
        user_id: state.data.user_id,
        ...validatedFields.data,
      })
    : await createProfile({
        user_id: state.data?.user_id || '',
        ...validatedFields.data,
      });

  return response;
};
