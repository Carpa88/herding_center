import { IResponseData } from '@app/_lib/types';
import { ERROR_MES_RESPONSE } from '@app/trials/consts';
import { ITrial, ITrialError } from '@app/trials/types';
import { sql } from '@node_modules/@vercel/postgres/dist';
import { NextResponse } from 'next/server';

export const PUT = async (
  request: Request,
): Promise<NextResponse<IResponseData<string, ITrialError>>> => {
  const body = await request.json();
  const { id, name, start_at, ends_on, judge_id, description } = body;

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
