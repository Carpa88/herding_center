'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { IFormState } from '@app/lib/types';
import { CreateTrial, PartialTrial } from '../types';

export const createTrial = async (
  state: IFormState<PartialTrial>,
  formData: FormData
): Promise<IFormState<PartialTrial>> => {
    const validatedFields = CreateTrial.safeParse({
    name: formData.get('name'),
    start_at: formData.get('start_at'),
    ends_on: formData.get('ends_on'),
    judge_id: formData.get('judge_id'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Не все поля заполнены. Запись не создана',
    };
  }
  // Prepare data for insertion into the database
  const { name, start_at, ends_on, judge_id, description } =
    validatedFields.data;

  try {
    await sql`
      INSERT INTO trials (name, start_at, ends_on, judge_id, description)
      VALUES (${name}, ${start_at}, ${ends_on}, ${judge_id}, ${description})
    `;
    revalidatePath('/trials');
    redirect('/trials');
  } catch (error) {
    console.error('Database error:', error);
    return {
      errors: {},
      message: 'Ошибка создания записи',
    };
  }
};
