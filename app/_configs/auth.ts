import { AuthOptions } from '@node_modules/next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from '@app/(user)/types';
import bcrypt from 'bcrypt';
import { getUser } from '@app/(user)/action';
import { API_BASE_URL } from '@app/_lib/consts';

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Credentials({
      credentials: {
        email: { label: 'Электронная почта', type: 'email' },
        password: { label: 'Пароль', type: 'password' },
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...userWithoutPass } = user;
            return userWithoutPass;
          }
        }

        console.error('Неверно введены данные');
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === 'google') {
        const email = profile?.email;

        if (email) {
          const dbUser = await getUser(email);
          if (dbUser) {
            token.role = dbUser.role;
            token.id = dbUser.id;
          } else {
            // Пользователь не найден — создаём
            const hashedPassword = await bcrypt.hash('google_oauth_dummy', 10);
            try {
              const response = await fetch(`${API_BASE_URL}/user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: hashedPassword }),
              });

              if (response.ok) {
                const result = await response.json();
                const newUser = result.data;

                token.role = newUser.role;
                token.id = newUser.id;
              }
            } catch (error) {
              console.error(
                'Ошибка при создании пользователя через Google',
                error,
              );
            }
          }
        }
      }

      if (user?.role) {
        token.role = user.role;
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
};
