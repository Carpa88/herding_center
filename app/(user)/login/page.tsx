'use client';

import Form from '@app/_ui/form/Form';
import Section from '@app/_ui/form/Section';
import PageCover from '@app/_ui/PageCover';
import Link from '@node_modules/next/link';
import Input from '@app/_ui/form/Input';
import { signIn } from '@node_modules/next-auth/react';
import { redirect, useSearchParams } from '@node_modules/next/navigation';
import { LoginSchema } from '../types';
import { useState } from 'react';

const Login = () => {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const validatedFields = LoginSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });
    if (!validatedFields.success) {
      const flatErrors = validatedFields.error.flatten().fieldErrors;
      setErrors(flatErrors);
      return;
    }
    setErrors({});

    const { email, password } = validatedFields.data;
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error('Ошибка входа:', result.error);
    } else {
      console.log('Успешный вход!');
    }
    redirect('/profile');
  };

  return (
    <PageCover title="Пожалуйста, войдите в систему">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <Form
          onSubmit={handleLogin}
          buttonName="Войти в систему"
          buttonClass="w-full"
        >
          <Section cols={1}>
            <Input
              name="email"
              label="Электронный адрес"
              autoComplete="email"
              errors={errors.email}
            />
            <Input
              name="password"
              label="Пароль"
              type="password"
              errors={errors.password}
            />
          </Section>
        </Form>

        <Link
          href="/singup"
          className="w-full text-end underline text-buttonDefault hover:text-buttonHover"
        >
          Зарегистрироваться
        </Link>
        <button
          onClick={() => signIn('google', { callbackUrl })}
          className="w-full h-10 text-sm font-medium text-center rounded-lg text-buttonDefault hover:text-buttonHover bg-bgDefault outline outline-2 outline-buttonDefault hover:outline-buttonHover"
        >
          Войти через GOOGLE
        </button>
      </div>
    </PageCover>
  );
};
export default Login;
