import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { ID, IResponseData } from '@app/_lib/types';
import { fetchResponseAPICatch } from '@app/_lib/utils';
import { SUCCESS_MESSAGE } from '@app/_lib/consts';
import { IFullApp } from '@app/trials/[id]/app/type';
import { ITEMS_PER_PAGE } from '@app/trials/consts';

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

export const GET = async (
  request: Request,
): Promise<NextResponse<IResponseData<IFullApp[], string>>> => {
  const enquery = request.headers.get('query') || '';
  const query = decodeURIComponent(enquery);
  const currentPage = request.headers.get('page') || '1';
  const offset = (+currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const apps = await sql<IFullApp>`
      SELECT
        applications.id,
        profiles.user_name,
        profiles.phone,
        dogs.name,
        dogs.breed,
        dogs.birth_year,
        dogs.sex
      FROM applications
      JOIN profiles ON applications.profile_id = profiles.id
      JOIN dogs ON applications.dog_id = dogs.id
      WHERE
        profiles.user_name ILIKE ${`%${query}%`} OR
        profiles.phone ILIKE ${`%${query}%`} OR
        dogs.name ILIKE ${`%${query}%`} OR
        dogs.breed ILIKE ${`%${query}%`} OR
        dogs.birth_year::text ILIKE ${`%${query}%`}
      ORDER BY applications.registration_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;
    return NextResponse.json({
      error: '',
      message: SUCCESS_MESSAGE,
      data: apps.rows,
    });
  } catch (error) {
    console.error('offset:', offset);
    return fetchResponseAPICatch(error as Error);
  }
};
