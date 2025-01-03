export interface INavigation {
  name: string;
  href: string;
}

export interface IFormState<T> {
  errors: T;
  message: string;
}

export interface IData {
  id: string;
  [key: string]: unknown;
}