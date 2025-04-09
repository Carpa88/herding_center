export interface INavigation {
  name: string;
  href: string;
}

export interface IFormState<Y, T> {
  error: Partial<T> | Error | string;
  message: string;
  data: Y | null;
}

export interface IData {
  id: string;
  [key: string]: unknown;
}

export interface IResponseData<Y, T> {
  error: Partial<T> | Error | string;
  message: string;
  data: Y | null;
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

export interface Props {
  params: {
    id: string;
  };
}

export interface TypeRequest {
  url: string;
  method: 'PUT' | 'POST';
  body: Record<string, string | undefined>;
}

export type ERRORS<P> = string | Error | P;
