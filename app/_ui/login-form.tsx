import { authenticate } from '@app/(users)/action';
import { useActionState } from 'react';
import Input from './form/Input';
import Section from './form/Section';
import Form from './form/Form';

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  return (
    <Form
      formAction={formAction}
      buttonName="Войти в систему"
      buttonClass="w-full"
      errorMessage={state}
      buttonState={isPending}
    >
      <Section cols={1}>
        <Input
          name="email"
          label="Электронный адрес"
          type="email"
          autoComplete="email"
        />
        <Input name="password" label="Пароль" type="password" />
      </Section>
    </Form>
  );
};

export default LoginForm;
