import { ITrialError } from './types';

export const ITEMS_PER_PAGE = 6;

export const colTrials = ['Название', 'Дата начала', 'Дата окончания', 'Судьи'];

export const createTrialErrors: ITrialError = {
  id: [],
  name: [],
  start_at: [],
  ends_on: [],
  judge_id: [],
  description: [],
};

export const ERROR_MES_RESPONSE = 'Ошибка ответа сервера';
export const ERROR_MES_REQUEST = 'Ошибка запроса к серверу';
