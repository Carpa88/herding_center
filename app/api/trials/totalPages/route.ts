import { sql } from '@vercel/postgres';
import { ITEMS_PER_PAGE } from '@app/trials/consts';
import { NextResponse } from 'next/server';
import { IResponseData } from '@app/_lib/types';
import { fetchResponseAPICatch } from '@app/_lib/utils';
import { SUCCESS_MESSAGE } from '@app/_lib/consts';

export const GET = async (
  request: Request,
): Promise<NextResponse<IResponseData<number, string>>> => {
  const enquery = request.headers.get('query') || '';
  const query = decodeURIComponent(enquery);
  try {
    const count = await sql`SELECT COUNT(*)
    FROM trials
    WHERE
      trials.name ILIKE ${`%${query}%`} OR
      trials.start_at ILIKE ${`%${query}%`} OR
      trials.ends_on ILIKE ${`%${query}%`} OR
      trials.judge_id ILIKE ${`%${query}%`} OR
      trials.description ILIKE ${`%${query}%`}
  `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return NextResponse.json({
      error: '',
      message: SUCCESS_MESSAGE,
      data: totalPages,
    });
  } catch (error) {
    return fetchResponseAPICatch(error as Error);
  }
};
