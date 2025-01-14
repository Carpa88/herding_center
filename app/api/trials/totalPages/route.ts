import { sql } from '@vercel/postgres';
import { ITEMS_PER_PAGE } from '@app/trials/consts';
import { NextResponse } from 'next/server';

export const GET = async(request: Request) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  
  try {
    const count = await sql`SELECT COUNT(*)
    FROM trials
    WHERE
      trials.name ILIKE ${`%${query}%`} OR
      trials.start_at ILIKE ${`%${query}%`} OR
      trials.ends_on ILIKE ${`%${query}%`} OR
      trials.judge_id ILIKE ${`%${query}%`} OR
      trials.description ILIKE ${`%${query}%`}
  `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return NextResponse.json({ totalPages });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Ошибка создания записи' });
  }
};