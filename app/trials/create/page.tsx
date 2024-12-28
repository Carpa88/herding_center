'use client';

import Form from '@app/ui/form/Form';
import Input from '@app/ui/form/Input';
import Section from '@app/ui/form/Section';
import { useActionState } from 'react';
import { initCreateTrial } from '../consts';
import { createTrial } from './actions';
import PageCover from '@app/ui/PageCover';

const Page = () => {
  const [state, formAction, isPading] = useActionState(
    createTrial,
    initCreateTrial
  );

  return (
    <PageCover title='Новое соревнование'>
      <Form buttonState={isPading} formAction={formAction}>
        <Section
          title="Заполните, пожалуйста, анкету для участия в соревнованиях, которые пройдут 31 декабря 2025г."
          description="Введите персональные данные"
        >
          <Input name="name" label="Название соревнования" errors={state?.errors?.name} />
          <Input name="start_at" label="Начало в" errors={state?.errors?.start_at} />
          <Input name="ends_on" label="Конец" errors={state?.errors?.ends_on} />
          <Input name="judge_id" label="Имя судьи" errors={state?.errors?.judge_id} />
          <Input name="description" label="Описание" errors={state?.errors?.description} />
        </Section>

        {state?.message && (
          <p className="mt-2 text-sm text-red-800">{state.message}</p>
        )}
      </Form>
    </PageCover>
  );
};

export default Page;
