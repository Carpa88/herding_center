'use client';

import Form from '@app/_ui/form/Form';
import Section from '@app/_ui/form/Section';
import PageCover from '@app/_ui/PageCover';
import Input from '@app/_ui/form/Input';
import { initialState } from '@app/_lib/consts';
import { useActionState } from 'react';
import { signup } from '../action';
import { ISinginError } from '../types';

const SingUp = () => {
  const [state, formAction, isPading] = useActionState(signup, initialState);
  const errorObj = state.error as Partial<ISinginError>;
  return (
    <PageCover title="Пожалуйста, войдите в систему">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <Form
          buttonState={isPading}
          formAction={formAction}
          buttonName="Войти в систему"
          buttonClass="w-full"
          errorMessage={state.message}
        >
          <Section cols={1}>
            <Input
              name="email"
              label="Электронный адрес"
              autoComplete="email"
              errors={errorObj.email}
            />
            <Input
              name="password"
              label="Пароль"
              type="password"
              errors={errorObj.password}
            />
            <Input
              name="confirmPassword"
              label="Повторите пароль"
              type="password"
              errors={errorObj.confirmPassword}
            />
          </Section>
        </Form>
      </div>
    </PageCover>
  );
};
export default SingUp;
