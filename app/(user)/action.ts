'use server';

import { IUser } from './types';
import { sql } from '@node_modules/@vercel/postgres/dist';

export const getUser = async (email: string): Promise<IUser | undefined> => {
  try {
    const user = await sql<IUser>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error(
      'Введенные данные не совпадают с записью в базе данных',
      error,
    );
    throw new Error('Failed to fetch user.');
  }
};

// export const authenticate = async (
//   prevState: IFormState<ILoginError>,
//   formData: FormData,
// ): Promise<IResponseData<string, ILoginError>> => {
//   const validatedFields = LoginSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password'),
//   });

//   if (!validatedFields.success) {
//     return {
//       error: validatedFields.error.flatten().fieldErrors,
//       message: 'Не все поля заполнены корректно',
//       data: null,
//     };
//   }
//   const { email, password } = validatedFields.data;
//   try {
//     const response = await fetch(`${API_BASE_URL}/user/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       console.error('response', response);
//       const message = await response.json();
//       return {
//         error: 'ошибка',
//         message,
//         data: null,
//       };
//     }
//   } catch (error) {
//     console.error('Fetch error:', error);
//     return {
//       error: error as Error,
//       message: ERROR_MES_REQUEST,
//       data: null,
//     };
//   }
//   revalidatePath('/profile');
//   redirect('/profile');
// };

// export const signup = async (
//   prevState: IFormState<ISinginError>,
//   formData: FormData,
// ): Promise<IResponseData<string, ISinginError>> =>
// const validatedFields = SignupSchema.safeParse({
//   email: formData.get('email'),
//   password: formData.get('password'),
//   confirmPassword: formData.get('confirmPassword'),
// });

// if (!validatedFields.success) {
//   return {
//     error: validatedFields.error.flatten().fieldErrors,
//     message: 'Не все поля заполнены корректно',
//     data: null,
//   };
// }
// const { email, password } = validatedFields.data;

// const hashedPassword = await bcrypt.hash(password, 10);
// const body = { email, password: hashedPassword };
// try {
//   const response = await fetch(`${API_BASE_URL}/user`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//   });

//   if (!response.ok) {
//     console.error('response', response);
//     const { message, error } = await response.json();
//     return {
//       error: error as Error,
//       message,
//       data: null,
//     };
//   }
//   await signIn('credentials', formData);
//   const data: string = await response.json();
//   return { error: '', message: '', data };
// } catch (error) {
//   console.error('Fetch error:', error);
// ({
//   error: prevState.error,
//   message: ERROR_MES_REQUEST,
//   data: JSON.stringify(formData),
// });
// }
