import { IResponseData } from '@app/_lib/types';
import { ERROR_MES_RESPONSE } from '@app/trials/consts';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const POST = async (
  request: Request,
): Promise<NextResponse<IResponseData<string, string>>> => {
  const body = await request.json();
  const { email, password } = body;

  try {
    const result = await sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${password})
      RETURNING id;
    `;
    return NextResponse.json({
      error: '',
      message: 'Запись успешно создана',
      data: result.rows[0].id,
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
