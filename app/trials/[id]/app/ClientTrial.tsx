'use client';

import Form from '@app/_ui/form/Form';
import { applyApp } from '@app/trials/actions';
import { useActionState, useMemo } from 'react';
import AppForm from './AppForm';
import { PartialApp } from './type';
import { ITrial } from '@app/trials/types';
import { FullProfile } from '@app/(user)/types';
import { IDog } from '@app/pet/types';
import ProfileForm from '@app/(user)/settings/ProfileForm';

const ClientApp = ({
  trial,
  profile,
  pet,
}: {
  trial: ITrial | null;
  profile: FullProfile | null;
  pet: IDog[] | null;
}) => {
  const [state, formAction, isPading] = useActionState(applyApp, {
    error: '',
    message: '',
    data: {
      profile_id: profile ? profile?.id : 'noProfile',
      dog_id: '',
      trial_id: trial?.id || '1',
    },
  });
  const correctTypeError = useMemo(() => {
    if (state && typeof state.error === 'object' && 'name' in state.error) {
      return state.error as PartialApp;
    }
    return undefined;
  }, [state]);
  return (
    <Form
      buttonState={isPading}
      formAction={formAction}
      href="/trials"
      errorMessage={state.message}
    >
      <ProfileForm
        title="Давайте поговорим о Вас!"
        description="Проверьте, пожалуйста данные о вас. Все ли правильно записао в системе?"
        data={profile}
        errors={correctTypeError}
      />
      <AppForm
        errors={correctTypeError}
        title={`${trial?.start_at} - ${trial?.ends_on}`}
        description={trial?.description}
        petData={pet}
      />
    </Form>
  );
};

export default ClientApp;
