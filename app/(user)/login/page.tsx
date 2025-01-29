'use client';

import Form from '@app/_ui/form/Form';
import Section from '@app/_ui/form/Section';
import PageCover from '@app/_ui/PageCover';
import { useActionState, useMemo } from 'react';
import Link from '@node_modules/next/link';
import { authenticate } from '../action';
import Input from '@app/_ui/form/Input';
import { initialState } from '@app/_lib/consts';
import { PartialLoginError } from '../types';

const Login = () => {
  const [state, formAction, isPending] = useActionState(
    authenticate,
    initialState,
  );

  const correctTypeError = useMemo(() => {
    if (state && typeof state.error === 'object') {
      return state.error as PartialLoginError;
    }
    return undefined;
  }, [state]);
  return (
    <PageCover title="Пожалуйста, войдите в систему">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <Form
          formAction={formAction}
          buttonName="Войти в систему"
          buttonClass="w-full"
          errorMessage={state?.message}
          buttonState={isPending}
        >
          <Section cols={1}>
            <Input
              name="email"
              label="Электронный адрес"
              type="email"
              autoComplete="email"
              errors={correctTypeError?.email}
            />
            <Input
              name="password"
              label="Пароль"
              type="password"
              errors={correctTypeError?.password}
            />
          </Section>
        </Form>

        <Link
          href="/singup"
          className="w-full text-end underline text-amber-700 hover:text-amber-600"
        >
          Зарегистрироваться
        </Link>
      </div>
    </PageCover>
  );
};
export default Login;
