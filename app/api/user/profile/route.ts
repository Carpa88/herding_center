import { ID, IResponseData } from '@app/_lib/types';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { SUCCESS_MESSAGE } from '@app/_lib/consts';
import { fetchResponseAPICatch } from '@app/_lib/utils';

export const POST = async (
  request: Request,
): Promise<NextResponse<IResponseData<ID, Error | string>>> => {
  const body = await request.json();
  const { user_id, user_name, phone, image_url } = body;

  try {
    const request =
      await sql<ID>`INSERT INTO profiles (user_id, user_name, phone, image_url) VALUES (${user_id}, ${user_name}, ${phone}, ${image_url}) RETURNING id`;

    return NextResponse.json({
      error: '',
      message: SUCCESS_MESSAGE,
      data: request.rows[0],
    });
  } catch (error) {
    return fetchResponseAPICatch(error as Error);
  }
};
