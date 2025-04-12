'use server';

import { CreateTrial, ITrial, ITrialError } from './types';
import { API_BASE_URL } from '@app/_lib/consts';
import { ERRORS, IFormState, IResponseData } from '@app/_lib/types';
import { redirect } from '@node_modules/next/navigation';
import { revalidatePath } from 'next/cache';
import { fetchErrorJson, fetchResponseCatch } from '@app/_lib/utils';
import { IApp, IAppError } from './[id]/app/type';
import { createProfile, editProfile } from '@app/(user)/action';
import { ProfileSchema } from '@app/(user)/types';
import { getServerSession } from 'next-auth';
import { authConfig } from '@app/_configs/auth';
import { createPet } from '@app/pet/actions';

export const fetchTrialsPages = async (
  query: string,
): Promise<IResponseData<number, string>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/trials/totalPages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        query,
      },
    });

    const result = await fetchErrorJson(response);
    return { error: '', message: '', data: Number(result.data) };
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
};

export const fetchFilteredTrials = async (
  query: string,
  currentPage: number,
): Promise<IResponseData<ITrial[], string | Error>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/trials`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        query,
        page: currentPage.toString(),
      },
    });

    return await fetchErrorJson(response);
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
};

export const deleteTrial = async (
  id: string,
): Promise<IResponseData<null, string | Error>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/trials`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id),
    });
    return fetchErrorJson(response);
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
};

export const fetchTrial = async (
  id: string,
): Promise<IResponseData<ITrial, ITrialError>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/trials/list/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    return fetchErrorJson(response);
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
};

export const updateTrial = async (
  state: IFormState<string, ITrialError>,
  formData: FormData,
): Promise<IResponseData<string, ITrialError>> => {
  const id = state.data;
  const validatedFields = CreateTrial.safeParse({
    name: formData.get('name'),
    start_at: formData.get('start_at'),
    ends_on: formData.get('ends_on'),
    judge_id: formData.get('judge_id'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: 'Не все поля заполнены корректно',
      data: null,
    };
  }
  try {
    const response = await fetch(`${API_BASE_URL}trials/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });

    fetchErrorJson(response);
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
  revalidatePath('/trials');
  redirect('/trials');
};

export const createTrial = async (
  state: IFormState<string, ITrialError>,
  formData: FormData,
): Promise<IResponseData<string, ITrialError>> => {
  const validatedFields = CreateTrial.safeParse({
    name: formData.get('name'),
    start_at: formData.get('start_at'),
    ends_on: formData.get('ends_on'),
    judge_id: formData.get('judge_id'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: 'Не все поля заполнены корректно',
      data: null,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/trials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedFields),
    });

    fetchErrorJson(response);
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
  revalidatePath('/trials');
  redirect('/trials');
};

export const getLastTrial = async (): Promise<
  IResponseData<ITrial, ERRORS<ITrialError>>
> => {
  try {
    const response = await fetch(`${API_BASE_URL}/trials/last`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    return fetchErrorJson(response);
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
};

export const applyApp = async (
  state: IFormState<IApp, IAppError>,
  formData: FormData,
): Promise<IResponseData<IApp, IAppError>> => {
  const session = await getServerSession(authConfig);
  const validatedFields = ProfileSchema.safeParse({
    user_name: formData.get('user_name'),
    phone: formData.get('phone'),
    image_url: formData.get('image_url'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors as Partial<IAppError>,
      message: 'Не все поля заполнены корректно',
      data: null,
    };
  }
  const request =
    state.data?.profile_id === 'noProfile'
      ? await createProfile({
          user_name: validatedFields.data.user_name,
          phone: validatedFields.data.phone,
          image_url: validatedFields.data.image_url,
          user_id: session?.user.id || '',
        })
      : await editProfile({
          user_name: validatedFields.data.user_name,
          phone: validatedFields.data.phone,
          image_url: validatedFields.data.image_url,
          user_id: session?.user.id || '',
          id: state.data?.profile_id || '',
        });
  const petID = formData.get('dog_id');
  const pet = {
    id: petID === 'new' ? (await createPet(formData))?.data?.id : petID,
  };
  const body = {
    profile_id: request.data?.id,
    dog_id: pet.id,
    trial_id: state.data?.trial_id,
  };

  try {
    const response = await fetch(
      `${API_BASE_URL}/trials/list/${state.data?.trial_id}/app`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
      },
    );

    return fetchErrorJson(response);
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
};
