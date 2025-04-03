import { ERROR_MES_RESPONSE } from '@app/trials/consts';
import { sql } from '@vercel/postgres';
import { NextResponse } from '@node_modules/next/server';

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

export const GET = async () => {
  ///Берем всех собак одного человека
};
