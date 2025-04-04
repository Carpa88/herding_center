import { Props } from '@app/_lib/types';
import { IDog } from '@app/pet/types';
import { ERROR_MES_RESPONSE } from '@app/trials/consts';
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

export const DELETE = async () => {
  ///удаляем конкрутную собаку
};

export const PUT = async () => {
  ///Редактируем конкрутную собаку
};
