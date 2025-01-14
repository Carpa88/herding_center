'use server';

import { IFormState } from '@app/_lib/types';
import { PartialTrial } from '../types';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const createTrial = async (
  state: IFormState<PartialTrial>,
  formData: FormData
) => {
  const body = {
    name: formData.get('name'),
    start_at: formData.get('start_at'),
    ends_on: formData.get('ends_on'),
    judge_id: formData.get('judge_id'),
    description: formData.get('description'),
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trials/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const { message, errors } = await response.json();
      return {
        errors: errors || {},
        message,
      };
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return { errors: {}, message: 'Ошибка отправки данных' };
  }
  revalidatePath('/trials');
  redirect('/trials');
};
