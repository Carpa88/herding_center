'use client';

import Form from '@app/_ui/form/Form';
import { useActionState, useMemo } from 'react';
import { createTrial } from '@app/trials/actions';
import PageCover from '@app/_ui/PageCover';
import TrialForm from '@app/_ui/trials/TrialForm';
import { PartialTrial } from '../types';
import { initialState } from '@app/_lib/consts';

const CreateTrial = () => {
  const [state, formAction, isPading] = useActionState(
    createTrial,
    initialState,
  );
  const correctTypeError = useMemo(() => {
    if (state && typeof state.error === 'object' && 'name' in state.error) {
      return state.error as PartialTrial;
    }
    return undefined;
  }, [state]);
  return (
    <PageCover title="Новое соревнование">
      <Form buttonState={isPading} formAction={formAction} href="/trials">
        <TrialForm
          errors={correctTypeError}
          title="Давайте проведем новое соревнование!"
          description="Обязательно напишите название, укажите даты проведения а также расскажите участникам почему на ваше соревнование стоит пойти"
        />
        {state?.message && (
          <p className="mt-2 text-sm text-textError">{state.message}</p>
        )}
      </Form>
    </PageCover>
  );
};

export default CreateTrial;
