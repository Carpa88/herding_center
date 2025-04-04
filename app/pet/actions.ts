'use server';

import { authConfig } from '@app/_configs/auth';
import { API_BASE_URL } from '@app/_lib/consts';
import { IFormState, IResponseData } from '@app/_lib/types';
import {
  IDogCreatedError,
  IDogCreated,
  CreatePetSchema,
  IDog,
} from '@app/pet/types';
import { ERROR_MES_REQUEST } from '@app/trials/consts';
import { redirect } from '@node_modules/next/navigation';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const createPet = async (
  state: IFormState<IDogCreated, IDogCreatedError>,
  formData: FormData,
): Promise<IResponseData<IDogCreated, IDogCreatedError>> => {
  const session = await getServerSession(authConfig);

  const validatedFields = CreatePetSchema.safeParse({
    name: formData.get('name'),
    breed: formData.get('breed'),
    birth_year: +(formData.get('birth_year') || 0),
    type: formData.get('type'),
    sex: formData.get('sex'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: 'Не все поля заполнены корректно',
      data: null,
    };
  }
  try {
    const response = await fetch(`${API_BASE_URL}/pet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        owner_id: session?.user.id,
        ...validatedFields.data,
      }),
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

export const getPets = async (
  id: string,
): Promise<IResponseData<IDog[], string>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pet?id=${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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

    const result: IResponseData<IDog[], string> = await response.json();
    return { error: '', message: '', data: result.data };
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: error as Error, message: ERROR_MES_REQUEST, data: null };
  }
};

export const getPet = async () => {
  //достаем данные собаки
};
