import { CreateTrial } from '@app/trials/types';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const data = await request.json();
  const { name, start_at, ends_on, judge_id, description } = data;

  const validatedFields = CreateTrial.safeParse({
    name,
    start_at,
    ends_on,
    judge_id,
    description,
  });

  if (!validatedFields.success) {
    return NextResponse.json({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Не все поля заполнены. Запись не создана',
    });
  }

  try {
    await sql`
      INSERT INTO trials (name, start_at, ends_on, judge_id, description)
      VALUES (${name}, ${start_at}, ${ends_on}, ${judge_id}, ${description})
    `;
    return NextResponse.json({ message: 'Запись успешно создана' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Ошибка создания записи' });
  }
}
