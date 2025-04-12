import { ERROR_MES_RESPONSE, SUCCESS_MESSAGE } from '@app/_lib/consts';
import { NextResponse } from '@node_modules/next/server';
import { sql } from '@node_modules/@vercel/postgres/dist';
import { IResponseData } from '@app/_lib/types';
import { TakenUser } from '@app/(user)/types';

export const POST = async (
  request: Request,
): Promise<NextResponse<IResponseData<TakenUser, Error | string>>> => {
  const req = await request.json();
  const { email, password } = req;

  try {
    const result = await sql<TakenUser>`
    INSERT INTO users (email, password)
    VALUES (${email}, ${password})
    RETURNING id, email, role;
  `;
    return NextResponse.json({
      error: '',
      message: SUCCESS_MESSAGE,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Database Error:', error);
    const dbError = error as { code?: string; message?: string };
    let message = ERROR_MES_RESPONSE;

    // Проверка на дубликат email
    if (
      dbError.code === '23505' || // стандартный код уникальности в PostgreSQL
      (typeof dbError.message === 'string' &&
        dbError.message.includes('duplicate key value'))
    ) {
      message = 'Пользователь с таким электронным адресом уже зарегистрирован';
    }
    return NextResponse.json({
      error: error as Error,
      message,
      data: null,
    });
  }
};
