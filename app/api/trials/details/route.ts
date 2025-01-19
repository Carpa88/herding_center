import { sql } from '@vercel/postgres';
import { ERROR_MES_RESPONSE } from '@app/trials/consts';
import { NextResponse } from 'next/server';
import { IResponseData } from '@app/_lib/types';
import { ITrial } from '@app/trials/types';

export const GET = async (
  request: Request,
): Promise<NextResponse<IResponseData<ITrial, string>>> => {
  const id = request.headers.get('id');
  try {
    const result = await sql<ITrial>`SELECT * FROM trials WHERE id = ${id}`;

    return NextResponse.json({ error: '', message: '', data: result.rows[0] });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({
      error: error as Error,
      message: ERROR_MES_RESPONSE,
      data: null,
    });
  }
};
