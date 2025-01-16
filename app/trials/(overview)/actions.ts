'use server'

import { sql } from '@vercel/postgres';
import { ITrial } from '../types';
import { API_BASE_URL } from '@app/_lib/consts';
import { IResponseData } from '@app/_lib/types';

export const fetchTrialsPages = async(query: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/trials/totalPages`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json; charset=utf-8',
        'query': query,
      },
  })

  if (!response.ok) {
    const { message, errors } = await response.json();
    return {
      errors: errors || {},
      message,
      data: 0
      };
    }
    const request: IResponseData<number> = await response.json();
    const totalPages = Number(request.data);
    
    return { errors: {}, message: '', data: totalPages };
  } catch (error) {
    console.error('Fetch error:', error);
    return { errors: error, message: 'Ошибка запроса к серверу', data: 0 };
  }
}

export const fetchFilteredTrials = async (query: string, currentPage: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/trials`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json; charset=utf-8',
        'query': query,
        'page': currentPage.toString(),
      },
    });
    
    if (!response.ok) {
      const { message, errors } = await response.json();
      return {
        errors: errors,
        message,
        data: null
      };
    }

    const request: IResponseData<ITrial[] | null> = await response.json();    
    return { errors: {}, message: '', data: request.data };
  } catch (error) {
    console.error('Fetch error:', error);
    return { errors: error, message: 'Ошибка запроса к серверу', data: null };
  }
}

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