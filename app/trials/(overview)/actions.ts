'use server'

import { sql } from '@vercel/postgres';
import { ITEMS_PER_PAGE } from '../consts';
import { ITrial } from '../types';

export const fetchTrialsPages = async() => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trials/totalPages`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const { message, errors } = await response.json();
    return {
      errors: errors || {},
      message,
      };
    }
    const data = await response.json();
    const totalPages = Number(data.totalPages);
    
    return totalPages;
  } catch (error) {
    console.error('Fetch error:', error);
    return { errors: {}, message: 'Ошибка отправки данных' };
  }
}

export const fetchFilteredTrials = async (
  query: string,
  currentPage: number
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const trials = await sql<ITrial>`
      SELECT
        trials.id,
        trials.name,
        trials.start_at,
        trials.ends_on,
        trials.judge_id,
        trials.description,
        trials.created_at
      FROM trials
      WHERE
        trials.name ILIKE ${`%${query}%`} OR
        trials.start_at ILIKE ${`%${query}%`} OR
        trials.ends_on ILIKE ${`%${query}%`} OR
        trials.judge_id ILIKE ${`%${query}%`} OR
        trials.description ILIKE ${`%${query}%`}
      ORDER BY trials.created_at ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return trials.rows;
  } catch (error) {
    console.error('Database Error:', error);
    console.error('offset:', offset);
    throw new Error('Ошибка соединения с базой данных');
  }
};

export const deleteTrial = async (id: string) => {
  try {
    await sql`DELETE FROM trials WHERE id = ${id}`;
    return { message: 'Соревнование удалено', success: true };
  } catch (error) {
    console.error('Delete operation failed:', error);
    return { message: 'Ошибка доступа к базе данных.', success: false };
  }
};

export const fetchTrial = async(id:string) => {
  try{
    const result = await sql`SELECT * FROM trials WHERE id = ${id}`;
    return result.rows;
  }catch (error) {
    console.error('offset:', error);
    throw new Error('Ошибка соединения с базой данных');
  }
}