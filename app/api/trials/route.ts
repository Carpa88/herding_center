import { IResponseData } from '@app/_lib/types';
import { ERROR_MES_RESPONSE, ITEMS_PER_PAGE } from '@app/trials/consts';
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
        trials.created_at
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

    return NextResponse.json({ error: '', message: '', data: trials.rows });
  } catch (error) {
    console.error('Database Error:', error);
    console.error('offset:', offset);
    return NextResponse.json({
      error: error as Error,
      message: ERROR_MES_RESPONSE,
      data: null,
    });
  }
};

export const POST = async (
  request: Request,
): Promise<NextResponse<IResponseData<string, string>>> => {
  const body = await request.json();
  const { name, start_at, ends_on, judge_id, description } = body.data;

  if (!body.success) {
    return NextResponse.json({
      error: body.error.flatten().fieldErrors as string,
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
      error: '',
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

export const DELETE = async (
  request: Request,
): Promise<NextResponse<Record<string, string>>> => {
  const id = await request.json();
  try {
    await sql`DELETE FROM trials WHERE id = ${id}`;
    return NextResponse.json({
      message: 'Successfully',
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({
      message: ERROR_MES_RESPONSE,
    });
  }
};
