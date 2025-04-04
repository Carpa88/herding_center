import { ERROR_MES_RESPONSE } from '@app/trials/consts';
import { sql } from '@vercel/postgres';
import { NextResponse } from '@node_modules/next/server';
import { IDog } from '@app/pet/types';

export const POST = async (request: Request) => {
  const pet = await request.json();
  const { name, breed, birth_year, sex, owner_id, type } = pet;
  try {
    const result = await sql`
    INSERT INTO dogs (name, breed, birth_year, sex, owner_id, type)
    VALUES (${name}, ${breed}, ${birth_year}, ${sex}, ${owner_id}, ${type})
    RETURNING id;
  `;
    return NextResponse.json({
      error: '',
      message: 'Вы зарегистрированы!',
      data: result,
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({
      error: error as Error,
      message: ERROR_MES_RESPONSE,
      data: null,
    });
  }
};

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  try {
    const result = await sql<IDog[]>`
    SELECT * FROM dogs WHERE owner_id = ${id}`;

    return NextResponse.json({ error: '', message: '', data: result.rows });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({
      error: error as Error,
      message: ERROR_MES_RESPONSE,
      data: null,
    });
  }
};
