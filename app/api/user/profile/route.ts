import { CreateFullProfile } from '@app/(user)/types';
import { IResponseData } from '@app/_lib/types';
import { ERROR_MES_RESPONSE } from '@app/trials/consts';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const POST = async (
  request: Request,
): Promise<NextResponse<IResponseData<string, string | Error>>> => {
  const body = await request.json();
  const { user_id, user_name, phone, image_url } = body;

  try {
    await sql<CreateFullProfile>`INSERT INTO profiles (user_id, user_name, phone, image_url) VALUES (${user_id}, ${user_name}, ${phone}, ${image_url})`;

    return NextResponse.json({
      error: '',
      message: 'Запись успешно создана',
      data: null,
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
