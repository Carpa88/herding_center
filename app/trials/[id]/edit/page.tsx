'use client';

import Form from '@app/_ui/form/Form';
import { useActionState, useMemo } from 'react';
import { updateTrial } from '../../actions';
import PageCover from '@app/_ui/PageCover';
import { PartialTrial } from '@app/trials/types';
import TrialForm from '@app/_ui/trials/TrialForm';
import { useParams } from '@node_modules/next/navigation';

const Page = () => {
  const { id } = useParams();
  const [state, formAction, isPading] = useActionState(updateTrial, {
    error: '',
    message: '',
    data: typeof id === 'string' ? id : null,
  });
  const correctTypeError = useMemo(() => {
    if (state && typeof state.error === 'object' && 'name' in state.error) {
      return state.error as PartialTrial;
    }
    return undefined;
  }, [state]);
  return (
    <PageCover title="Исправьте данные соревнования">
      <Form
        buttonState={isPading}
        formAction={formAction}
        href="/trials"
        errorMessage={state.message}
      >
        <TrialForm
          errors={correctTypeError}
          title="Основной блок данных"
          description="Обязательно напишите название, укажите даты проведения а также расскажите участникам почему на ваше соревнование стоит пойти"
          id={typeof id === 'string' ? id : undefined}
        />
      </Form>
    </PageCover>
  );
};

export default Page;
