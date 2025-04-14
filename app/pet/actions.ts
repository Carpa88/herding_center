'use server';

import { authConfig } from '@app/_configs/auth';
import { API_BASE_URL } from '@app/_lib/consts';
import { IFormState, IResponseData } from '@app/_lib/types';
import { fetchErrorJson, fetchResponseCatch } from '@app/_lib/utils';
import { IDogCreatedError, CreatePetSchema, IDog } from '@app/pet/types';
import { ERROR_MES_REQUEST } from '@app/_lib/consts';
import { redirect } from '@node_modules/next/navigation';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const createPet = async (
  state: IFormState<IDog, IDogCreatedError>,
  formData: FormData,
): Promise<IResponseData<IDog, IDogCreatedError>> => {
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

    return fetchErrorJson(response);
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
};

export const getPets = async (
  session_id: string,
): Promise<IResponseData<IDog[], string | Error>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pet?id=${session_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return await fetchErrorJson(response);
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: error as Error, message: ERROR_MES_REQUEST, data: null };
  }
};

export const getPet = async (
  petID: string,
  ownerID: string,
): Promise<IResponseData<IDog, string | Error>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/pet/${petID}?ownerID=${ownerID}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return fetchErrorJson(response);
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
};

export const editPet = async (
  state: IFormState<IDog, IDogCreatedError>,
  formData: FormData,
): Promise<IResponseData<IDog, IDogCreatedError>> => {
  const session = await getServerSession(authConfig);
  const petID = state.data?.id;

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
    const response = await fetch(`${API_BASE_URL}/pet/${petID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: petID,
        owner_id: session?.user.id,
        ...validatedFields.data,
      }),
    });

    fetchErrorJson(response);
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
  revalidatePath('/profile');
  redirect('/profile');
};

export const deletePet = async (petID: string, ownerID: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/pet/${petID}?ownerID=${ownerID}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      },
    );

    fetchErrorJson(response);
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
  revalidatePath('/profile');
  redirect('/profile');
};
