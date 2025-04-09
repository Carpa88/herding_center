import { FullProfile } from '@app/(user)/types';
import { IResponseData, Props } from '@app/_lib/types';
import { ERROR_MES_RESPONSE } from '@app/trials/consts';
import { NextResponse } from '@node_modules/next/server';
import { sql } from '@vercel/postgres';

export const GET = async (
  req: Request,
  { params }: Props,
): Promise<NextResponse<IResponseData<FullProfile, Error | string>>> => {
  const { id } = await params;

  try {
    const result =
      await sql<FullProfile>`SELECT * FROM profiles WHERE user_id=${id}`;
    return NextResponse.json({
      error: '',
      message: '',
      data: result.rows[0],
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

export const PUT = async (
  request: Request,
): Promise<NextResponse<IResponseData<FullProfile, Error | string>>> => {
  const body = await request.json();
  const { id, user_id, name, phone, image_url } = body as FullProfile;

  try {
    await sql`UPDATE profiles SET name=${name}, phone=${phone}, image_url=${image_url} WHERE id=${id} AND user_id=${user_id}`;

    return NextResponse.json({
      error: '',
      message: 'Запись успешно изменена',
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

export const DELETE = async (
  req: Request,
  { params }: Props,
): Promise<NextResponse<IResponseData<string, Error | string>>> => {
  const { id } = await params;

  try {
    await sql`DELETE FROM profiles WHERE id=${id}`;

    return NextResponse.json({
      error: '',
      message: 'Everything is OK',
      data: null,
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({
      error: error as Error,
      message: ERROR_MES_RESPONSE,
      data: null,
    });
  }
};
