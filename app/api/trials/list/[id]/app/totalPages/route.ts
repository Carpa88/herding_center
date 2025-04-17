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
      FROM applications
      JOIN dogs ON applications.dog_id = dogs.id 
      JOIN profiles ON applications.profile_id = profiles.id 
      WHERE
        dogs.name ILIKE ${`%${query}%`} OR
        dogs.breed ILIKE ${`%${query}%`} OR
        dogs.birth_year::text ILIKE ${`%${query}%`} OR
        profiles.user_name ILIKE ${`%${query}%`} OR
        profiles.phone ILIKE ${`%${query}%`}
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
