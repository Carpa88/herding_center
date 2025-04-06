import { IResponseData, Props } from '@app/_lib/types';
import { IDog, PartialDog } from '@app/pet/types';
import { ERROR_MES_RESPONSE } from '@app/trials/consts';
import { NextResponse } from '@node_modules/next/server';
import { sql } from '@vercel/postgres';

export const GET = async (request: Request, { params }: Props) => {
  const url = new URL(request.url);
  const { id } = await params;
  const ownerID = url.searchParams.get('ownerID');

  try {
    const result = await sql<IDog>`
    SELECT * FROM dogs WHERE id=${id} AND owner_id=${ownerID}`;

    return Response.json({ error: '', message: '', data: result.rows[0] });
  } catch (error) {
    console.error('Database Error:', error);
    return Response.json({
      error: error as Error,
      message: ERROR_MES_RESPONSE,
      data: null,
    });
  }
};

export const PUT = async (
  request: Request,
): Promise<NextResponse<IResponseData<string, PartialDog>>> => {
  const req = await request.json();
  const { name, breed, birth_year, sex, owner_id, type, id } = req;

  try {
    await sql<IDog>`UPDATE dogs
    SET 
      name=${name},
      breed=${breed},
      birth_year=${birth_year},
      sex=${sex},
      type=${type}
      WHERE id = ${id} AND owner_id = ${owner_id}
      `;
    return NextResponse.json({
      error: '',
      message: 'Изменения выполнены успешно',
      data: null,
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

export const DELETE = async () => {
  ///удаляем конкрутную собаку
};
