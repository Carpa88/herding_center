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
