import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { ID, IResponseData } from '@app/_lib/types';
import { fetchResponseAPICatch } from '@app/_lib/utils';
import { SUCCESS_MESSAGE } from '@app/_lib/consts';

export const POST = async (
  request: Request,
): Promise<NextResponse<IResponseData<ID, string | Error>>> => {
  const body = await request.json();
  const { profile_id, dog_id, trial_id } = body;

  try {
    const result = await sql<ID>`
    INSERT INTO applications (profile_id, dog_id, trial_id)
      VALUES (${profile_id}, ${dog_id}, ${trial_id}) RETURNING id`;

    return NextResponse.json({
      error: '',
      message: SUCCESS_MESSAGE,
      data: result.rows[0],
    });
  } catch (error) {
    return fetchResponseAPICatch(error as Error);
  }
};

export const GET = async () => {
  //Все анкеты для данного соревнования для Кати
};
