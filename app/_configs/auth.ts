import type { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
};
// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// import Credentials from 'next-auth/providers/credentials';
// import { sql } from '@vercel/postgres';
// import bcrypt from 'bcrypt';
// import { IUser, LoginSchema } from '@app/(user)/types';

// const getUser = async (email: string): Promise<IUser | undefined> => {
//   try {
//     const user = await sql<IUser>`SELECT * FROM users WHERE email=${email}`;
//     return user.rows[0];
//   } catch (error) {
//     console.error(
//       'Введенные данные не совпадают с записью в базе данных',
//       error,
//     );
//     throw new Error('Failed to fetch user.');
//   }
// };

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const parsedCredentials = LoginSchema.safeParse(credentials);

//         if (parsedCredentials.success) {
//           const { email, password } = parsedCredentials.data;
//           const user = await getUser(email);
//           if (!user) {
//             return null;
//           }
//           const passwordsMatch = await bcrypt.compare(password, user.password);
//           if (passwordsMatch) {
//             return user;
//           }
//         }

//         console.error('Неверно введены данные');
//         return null;
//       },
//     }),
//   ],
// });
