import type { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from '@app/(user)/types';
import bcrypt from 'bcrypt';
import { getUser } from '@app/(user)/action';

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Credentials({
      credentials: {
        email: { label: 'Электронная почта', type: 'email', required: true },
        password: { label: 'Пароль', type: 'password', required: true },
      },
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return user;
          }
        }

        console.error('Неверно введены данные');
        return null;
      },
    }),
  ],
};
