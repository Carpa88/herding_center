import { SUCCESS_MESSAGE } from '@app/_lib/consts';
import { ID, IResponseData } from '@app/_lib/types';
import { fetchResponseAPICatch } from '@app/_lib/utils';
import { ITEMS_PER_PAGE } from '@app/trials/consts';
import { ITrial } from '@app/trials/types';
import { sql } from '@node_modules/@vercel/postgres/dist';
import { NextResponse } from 'next/server';

export const GET = async (
  request: Request,
): Promise<NextResponse<IResponseData<ITrial[], string>>> => {
  const enquery = request.headers.get('query') || '';
  const query = decodeURIComponent(enquery);
  const currentPage = request.headers.get('page') || '1';
  const offset = (+currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const trials = await sql<ITrial>`
      SELECT
        trials.id,
        trials.name,
        trials.start_at,
        trials.ends_on,
        trials.judge_id,
        trials.description,
        trials.created_at,
        trials.is_active
      FROM trials
      WHERE
        trials.name ILIKE ${`%${query}%`} OR
        trials.start_at ILIKE ${`%${query}%`} OR
        trials.ends_on ILIKE ${`%${query}%`} OR
        trials.judge_id ILIKE ${`%${query}%`} OR
        trials.description ILIKE ${`%${query}%`}
      ORDER BY trials.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return NextResponse.json({
      error: '',
      message: SUCCESS_MESSAGE,
      data: trials.rows,
    });
  } catch (error) {
    console.error('offset:', offset);
    return fetchResponseAPICatch(error as Error);
  }
};

export const POST = async (
  request: Request,
): Promise<NextResponse<IResponseData<ID, string>>> => {
  const body = await request.json();
  const { name, start_at, ends_on, judge_id, description, is_active } = body;

  try {
    const request = await sql<ID>`
      INSERT INTO trials (name, start_at, ends_on, judge_id, description, is_active)
      VALUES (${name}, ${start_at}, ${ends_on}, ${judge_id}, ${description}, ${is_active}) 
      RETURNING id
    `;
    return NextResponse.json({
      error: '',
      message: 'Запись успешно создана',
      data: request.rows[0],
    });
  } catch (error) {
    return fetchResponseAPICatch(error as Error);
  }
};

export const DELETE = async (
  request: Request,
): Promise<NextResponse<IResponseData<null, string>>> => {
  const id = await request.json();
  try {
    await sql`DELETE FROM trials WHERE id = ${id}`;
    return NextResponse.json({
      error: '',
      message: SUCCESS_MESSAGE,
      data: null,
    });
  } catch (error) {
    return fetchResponseAPICatch(error as Error);
  }
};
