import { sql } from '@vercel/postgres';
import { NextResponse } from '@node_modules/next/server';
import { IDog } from '@app/pet/types';
import { ID, IResponseData } from '@app/_lib/types';
import { fetchResponseAPICatch } from '@app/_lib/utils';
import { SUCCESS_MESSAGE } from '@app/_lib/consts';

export const POST = async (
  request: Request,
): Promise<NextResponse<IResponseData<ID, string | Error>>> => {
  const pet = await request.json();
  const { name, breed, birth_year, sex, owner_id, type } = pet;
  try {
    const result = await sql<ID>`
    INSERT INTO dogs (name, breed, birth_year, sex, owner_id, type)
    VALUES (${name}, ${breed}, ${birth_year}, ${sex}, ${owner_id}, ${type})
    RETURNING id;
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

export const GET = async (
  request: Request,
): Promise<NextResponse<IResponseData<IDog[], string | Error>>> => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  try {
    const result = await sql<IDog>`
    SELECT * FROM dogs WHERE owner_id = ${id}`;

    return NextResponse.json({ error: '', message: '', data: result.rows });
  } catch (error) {
    return fetchResponseAPICatch(error as Error);
  }
};
