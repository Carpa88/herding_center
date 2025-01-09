import { initialState } from '@app/_lib/consts';
import { ITrialError } from './types';

export const ITEMS_PER_PAGE = 10;

export const colTrials = [
            'Название',
            'Дата начала',
            'Дата окончания',
            'Судьи',
            'Описание',
          ]

export const createTrialErrors: ITrialError = {
  id:[],
  name: [],
  start_at: [],
  ends_on: [],
  judge_id: [],
  description: [],
};

export const initCreateTrial = initialState(createTrialErrors);