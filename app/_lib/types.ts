export interface INavigation {
  name: string;
  href: string;
}

export interface IFormState<T> {
  error: Partial<T> | Error | string;
  message: string;
  data: string | null;
}

export interface IData {
  id: string;
  [key: string]: unknown;
}

export interface IResponseData<T, Y> {
  error: Partial<Y> | Error | string;
  message: string;
  data: T | null;
}

export interface IUser {
  email: string;
  password: string;
  // role?: 'user' | 'admin';
}

export interface Authenticated {
  email: string;
  image: string;
  name: string;
}
