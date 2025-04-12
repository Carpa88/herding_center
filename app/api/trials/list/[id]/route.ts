import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { ID, IResponseData, Props } from '@app/_lib/types';
import { ITrial, ITrialError } from '@app/trials/types';
import { fetchResponseAPICatch } from '@app/_lib/utils';
import { SUCCESS_MESSAGE } from '@app/_lib/consts';

export const GET = async (
  request: Request,
  { params }: Props,
): Promise<NextResponse<IResponseData<ITrial, string>>> => {
  const { id } = await params;
  try {
    const result = await sql<ITrial>`SELECT * FROM trials WHERE id = ${id}`;

    return NextResponse.json({ error: '', message: '', data: result.rows[0] });
  } catch (error) {
    return fetchResponseAPICatch(error as Error);
  }
};

export const PUT = async (
  request: Request,
): Promise<NextResponse<IResponseData<ID, ITrialError>>> => {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();
  const body = await request.json();
  const { name, start_at, ends_on, judge_id, description } = body;

  try {
    const result = await sql<ID>`
        UPDATE trials
        SET 
          name = ${name},
          start_at = ${start_at},
          ends_on = ${ends_on},
          judge_id = ${judge_id},
          description = ${description}
        WHERE id = ${id}
        RETURNING id
      `;
    return NextResponse.json({
      error: '',
      message: SUCCESS_MESSAGE,
      data: result.rows[0],
    });
  } catch (error) {
    return fetchResponseAPICatch(error as Error);
  }
};
