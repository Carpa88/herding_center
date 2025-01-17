import { IResponseData } from '@app/_lib/types';
import { ERROR_MES_RESPONSE } from '@app/trials/consts';
import { CreateTrial } from '@app/trials/types';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const POST = async (
  request: Request,
): Promise<NextResponse<IResponseData<string>>> => {
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
      error: validatedFields.error.flatten().fieldErrors as string,
      message: 'Не все поля заполнены. Запись не создана',
      data: null,
    });
  }

  try {
    await sql`
      INSERT INTO trials (name, start_at, ends_on, judge_id, description)
      VALUES (${name}, ${start_at}, ${ends_on}, ${judge_id}, ${description})
    `;
    return NextResponse.json({
      error: {},
      message: '',
      data: 'Запись успешно создана',
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({
      error: error as Error,
      message: ERROR_MES_RESPONSE,
      data: null,
    });
  }
};
