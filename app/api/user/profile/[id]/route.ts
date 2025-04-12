import { FullProfile } from '@app/(user)/types';
import { SUCCESS_MESSAGE } from '@app/_lib/consts';
import { ID, IResponseData, Props } from '@app/_lib/types';
import { fetchResponseAPICatch } from '@app/_lib/utils';
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
      message: SUCCESS_MESSAGE,
      data: result.rows[0],
    });
  } catch (error) {
    return fetchResponseAPICatch(error as Error);
  }
};

export const PUT = async (
  request: Request,
): Promise<NextResponse<IResponseData<ID, Error | string>>> => {
  const body = await request.json();
  const { id, user_id, user_name, phone, image_url } = body as FullProfile;

  try {
    const request =
      await sql<ID>`UPDATE profiles SET user_name=${user_name}, phone=${phone}, image_url=${image_url} WHERE id=${id} AND user_id=${user_id} RETURNING id`;

    return NextResponse.json({
      error: '',
      message: SUCCESS_MESSAGE,
      data: request.rows[0],
    });
  } catch (error) {
    return fetchResponseAPICatch(error as Error);
  }
};

export const DELETE = async (
  req: Request,
  { params }: Props,
): Promise<NextResponse<IResponseData<null, Error | string>>> => {
  const { id } = await params;

  try {
    await sql`DELETE FROM profiles WHERE id=${id}`;

    return NextResponse.json({
      error: '',
      message: SUCCESS_MESSAGE,
      data: null,
    });
  } catch (error) {
    return fetchResponseAPICatch(error as Error);
  }
};
