'use server';

import { IFormState, IResponseData } from '@app/_lib/types';
import { PartialTrial } from '../types';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { API_BASE_URL } from '@app/_lib/consts';
import { ERROR_MES_REQUEST } from '../consts';

export const createTrial = async (
  state: IFormState<PartialTrial>,
  formData: FormData,
): Promise<IResponseData<string>> => {
  const body = {
    name: formData.get('name'),
    start_at: formData.get('start_at'),
    ends_on: formData.get('ends_on'),
    judge_id: formData.get('judge_id'),
    description: formData.get('description'),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/trials/create`, {
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
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: error as Error, message: ERROR_MES_REQUEST, data: null };
  }
  revalidatePath('/trials');
  redirect('/trials');
};
