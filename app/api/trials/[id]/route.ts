import { sql } from '@vercel/postgres';
import { ERROR_MES_RESPONSE } from '@app/trials/consts';
import { NextResponse } from 'next/server';
import { IResponseData } from '@app/_lib/types';
import { ITrial, ITrialError } from '@app/trials/types';

export const GET = async (
  request: Request,
): Promise<NextResponse<IResponseData<ITrial, string>>> => {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();
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

export const PUT = async (
  request: Request,
): Promise<NextResponse<IResponseData<string, ITrialError>>> => {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();
  const body = await request.json();
  const { name, start_at, ends_on, judge_id, description } = body;

  try {
    await sql<ITrial>`
        UPDATE trials
        SET 
          name = ${name},
          start_at = ${start_at},
          ends_on = ${ends_on},
          judge_id = ${judge_id},
          description = ${description}
        WHERE id = ${id}
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
