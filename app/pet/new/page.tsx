'use client';

import { createPet } from '@app/pet/actions';
import { initialState } from '@app/_lib/consts';
import Form from '@app/_ui/form/Form';
import PageCover from '@app/_ui/PageCover';
import { useActionState, useMemo } from 'react';
import DogForm from '@app/_ui/dogs/DogForm';
import { PartialDog } from '@app/pet/types';

const NewPet = () => {
  const [state, formAction, isPading] = useActionState(createPet, initialState);
  const correctTypeError = useMemo(() => {
    if (state && typeof state.error === 'object') {
      return state.error as PartialDog;
    }
    return undefined;
  }, [state]);

  return (
    <PageCover title="Расскижите о вашем питомце">
      <Form
        formAction={formAction}
        href="/profile"
        buttonState={isPading}
        errorMessage={state.message}
      >
        <DogForm errors={correctTypeError} />
      </Form>
    </PageCover>
  );
};

export default NewPet;
