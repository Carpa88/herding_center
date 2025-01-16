'use client';

import Form from '@app/_ui/form/Form';
import { useActionState } from 'react';
import { initCreateTrial } from '../consts';
import { createTrial } from './actions';
import PageCover from '@app/_ui/PageCover';
import TrialForm from '../TrialForm';

const Page = () => {
  const [state, formAction, isPading] = useActionState(
    createTrial,
    initCreateTrial,
  );

  return (
    <PageCover title="Новое соревнование">
      <Form buttonState={isPading} formAction={formAction} href="/trials">
        <TrialForm
          errors={state.errors}
          title="Давайте проведем новое соревнование!"
          description="Обязательно напишите название, укажите даты проведения а также расскажите участникам почему на ваше соревнование стоит пойти"
        />
        {state?.message && (
          <p className="mt-2 text-sm text-red-800">{state.message}</p>
        )}
      </Form>
    </PageCover>
  );
};

export default Page;
