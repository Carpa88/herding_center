import { sql } from '@vercel/postgres';
import { ITEMS_PER_PAGE } from '../consts';
import { ITrial } from '../types';
import { revalidatePath } from 'next/cache';

export const fetchTrialsPages = async (query: string) => {
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
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Ошибка взаимодействия с базой данных');
  }
};

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
        trials.description
      FROM trials
      WHERE
        trials.name ILIKE ${`%${query}%`} OR
        trials.start_at ILIKE ${`%${query}%`} OR
        trials.ends_on ILIKE ${`%${query}%`} OR
        trials.judge_id ILIKE ${`%${query}%`} OR
        trials.description ILIKE ${`%${query}%`}
      ORDER BY trials.name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return trials.rows;
  } catch (error) {
    console.error('Database Error:', error);
    console.error('offset:', offset);
    throw new Error('Ошибка соединения с базой данных');
  }
};

export const deleteTrial = async(id: string) => {
  try{
    await sql`DELETE FROM trials WHERE id = ${id}`;
  }catch(error){
    console.error(error)
    return { message: 'Ошибка доступа к базе данных.', success: false };
  }
  revalidatePath('/trial');
  return { message: 'Соревнование удалено', success: true };
}
