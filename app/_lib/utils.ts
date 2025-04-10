import { ERROR_MES_REQUEST } from '@app/trials/consts';

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const fetchErrorJson = async (
  response: Response,
): Promise<{ data: null; error: string | Error; message: string }> => {
  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    if (contentType && contentType.includes('application/json')) {
      const { error, message } = await response.json();
      return { data: null, error, message };
    } else {
      const text = await response.text();
      console.error('Expected JSON but got HTML:', text);
      return {
        data: null,
        error: 'server_error',
        message: 'Сервер вернул HTML вместо JSON',
      };
    }
  }
  return await response.json();
};

export const fetchResponseCatch = (error: Error) => {
  console.error('Fetch error:', error);
  return { error: error as Error, message: ERROR_MES_REQUEST, data: null };
};
