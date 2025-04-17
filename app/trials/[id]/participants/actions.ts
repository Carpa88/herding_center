import { API_BASE_URL } from '@app/_lib/consts';
import { IResponseData } from '@app/_lib/types';
import { fetchErrorJson, fetchResponseCatch } from '@app/_lib/utils';
import { IFullApp } from '../app/type';

export const fetchAppsPages = async (
  query: string,
  id: string,
): Promise<IResponseData<number, string>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/trials/list/${id}/app/totalPages`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          query,
        },
      },
    );

    const result = await fetchErrorJson(response);
    return { error: '', message: '', data: Number(result.data) };
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
};

export const fetchFilteredApps = async (
  query: string,
  currentPage: number,
  id: string,
): Promise<IResponseData<IFullApp[], string | Error>> => {
  try {
    const response = await fetch(`${API_BASE_URL}trials/list/${id}/app`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        query,
        page: currentPage.toString(),
      },
    });

    return await fetchErrorJson(response);
  } catch (error) {
    return fetchResponseCatch(error as Error);
  }
};
