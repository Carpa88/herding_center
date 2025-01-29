import { NextResponse } from 'next/server';
import { signIn } from '@auth';
import { ERROR_MES_RESPONSE } from '@app/trials/consts';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const result = await signIn('credentials', { email, password });

    if (!result) {
      return NextResponse.json({
        error: 'Введены неверные данные',
        status: 404,
      });
    }

    return NextResponse.json({ success: true, status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message.includes('CredentialsSignin')) {
      return NextResponse.json({
        error: 'Введены неверные данные',
        status: 401,
      });
    }
    return NextResponse.json({ error: ERROR_MES_RESPONSE, status: 500 });
  }
}
