import { ISex } from '@app/pet/types';

export interface IApp {
  id?: string;
  profile_id: string;
  dog_id: string;
  trial_id: string;
  registration_date?: string;
}

export interface IAppError {
  id: string[];
  profile_id: string[];
  dog_id: string[];
  trial_id: string[];
  registration_date?: string[];
}

export type PartialApp = Partial<IAppError>;

export interface IFullApp {
  id?: string;
  user_name: string;
  phone: string;
  name: string;
  breed: string;
  sex: ISex | string;
  birth_year: number;
}

export interface IFullAppError {
  id?: string[];
  user_name: string[];
  phone: string[];
  name: string[];
  breed: string[];
  sex: string[];
  birth_year: string[];
}

export type PartialFullApp = Partial<IFullAppError>;
