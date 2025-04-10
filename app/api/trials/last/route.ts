import { IResponseData } from '@app/_lib/types';
import { ERROR_MES_RESPONSE } from '@app/trials/consts';
import { ITrial } from '@app/trials/types';
import { sql } from '@node_modules/@vercel/postgres/dist';
import { NextResponse } from 'next/server';

export const GET = async (): Promise<
  NextResponse<IResponseData<ITrial, string | Error>>
> => {
  try {
    const trials = await sql<ITrial>`
      SELECT * FROM trials
      WHERE is_active = true
      ORDER BY created_at DESC
      LIMIT 1
    `;

    return NextResponse.json({ error: '', message: '', data: trials.rows[0] });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({
      error: error as Error,
      message: ERROR_MES_RESPONSE,
      data: null,
    });
  }
};
