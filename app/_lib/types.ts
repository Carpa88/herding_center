export interface INavigation {
  name: string;
  href: string;
}

export interface IFormState<T> {
  error: Partial<T> | Error | string;
  message: string;
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
