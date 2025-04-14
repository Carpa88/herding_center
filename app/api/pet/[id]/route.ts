import { SUCCESS_MESSAGE } from '@app/_lib/consts';
import { IResponseData, ParamsType } from '@app/_lib/types';
import { fetchResponseAPICatch } from '@app/_lib/utils';
import { IDog, PartialDog } from '@app/pet/types';
import { NextResponse, NextRequest } from '@node_modules/next/server';
import { sql } from '@vercel/postgres';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<IResponseData<IDog, Error | string>>> => {
  const url = new URL(request.url);
  const { id } = await params;
  const ownerID = url.searchParams.get('ownerID');

  try {
    const result = await sql<IDog>`
    SELECT * FROM dogs WHERE id=${id} AND owner_id=${ownerID}`;

    return NextResponse.json({
      error: '',
      message: SUCCESS_MESSAGE,
      data: result.rows[0],
    });
  } catch (error) {
    return fetchResponseAPICatch(error as Error);
  }
};

export const PUT = async (
  request: Request,
): Promise<NextResponse<IResponseData<null, PartialDog>>> => {
  const req = await request.json();
  const { name, breed, birth_year, sex, owner_id, type, id } = req;

  try {
    await sql`UPDATE dogs
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
      message: SUCCESS_MESSAGE,
      data: null,
    });
  } catch (error) {
    return fetchResponseAPICatch(error as Error);
  }
};

export const DELETE = async (
  request: Request,
  { params }: ParamsType,
): Promise<NextResponse<IResponseData<null, string>>> => {
  const url = new URL(request.url);
  const ownerID = url.searchParams.get('ownerID');
  const { id } = await params;

  try {
    await sql`DELETE FROM dogs WHERE id=${id} AND owner_id=${ownerID}`;

    return NextResponse.json({
      error: '',
      message: SUCCESS_MESSAGE,
      data: null,
    });
  } catch (error) {
    return fetchResponseAPICatch(error as Error);
  }
};
