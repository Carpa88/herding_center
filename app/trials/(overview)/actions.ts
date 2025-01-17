'use server';

import { sql } from '@vercel/postgres';
import { ITrial } from '../types';
import { API_BASE_URL } from '@app/_lib/consts';
import { IResponseData } from '@app/_lib/types';
import { ERROR_MES_REQUEST } from '../consts';

export const fetchTrialsPages = async (
  query: string,
): Promise<IResponseData<number, string>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/trials/totalPages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        query,
      },
    });

    if (!response.ok) {
      const { message, error } = await response.json();
      return {
        error,
        message,
        data: null,
      };
    }
    const request: IResponseData<number, string> = await response.json();
    const totalPages = Number(request.data);

    return { error: '', message: '', data: totalPages };
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: error as Error, message: ERROR_MES_REQUEST, data: null };
  }
};

export const fetchFilteredTrials = async (
  query: string,
  currentPage: number,
): Promise<IResponseData<ITrial[], string>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/trials`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        query,
        page: currentPage.toString(),
      },
    });

    if (!response.ok) {
      const { message, error } = await response.json();
      return {
        error,
        message,
        data: null,
      };
    }

    const request: IResponseData<ITrial[], string> = await response.json();
    return { error: '', message: '', data: request.data };
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: error as Error, message: ERROR_MES_REQUEST, data: null };
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

export const fetchTrial = async (id: string) => {
  try {
    const result = await sql`SELECT * FROM trials WHERE id = ${id}`;
    return result.rows;
  } catch (error) {
    console.error('offset:', error);
    throw new Error('Ошибка соединения с базой данных');
  }
};
