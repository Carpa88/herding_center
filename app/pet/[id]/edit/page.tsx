'use client';

import DogForm from '@app/_ui/dogs/DogForm';
import Form from '@app/_ui/form/Form';
import PageCover from '@app/_ui/PageCover';
import { editPet, getPet } from '@app/pet/actions';
import { IDog, PartialDog } from '@app/pet/types';
import { useSession } from '@node_modules/next-auth/react';
import { useParams } from 'next/navigation';
import { useActionState, useEffect, useMemo, useState } from 'react';

const PetEdit = () => {
  const params = useParams();
  const petID = params.id as string;
  const session = useSession();
  const [data, setData] = useState<IDog | null>(null);

  useEffect(() => {
    if (!petID) {
      return;
    }
    const fetchData = async () => {
      try {
        const pet = await getPet(petID, session?.data?.user.id || '1');
        setData(pet.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [petID, session]);

  const [state, formAction, isPading] = useActionState(editPet, {
    error: '',
    message: '',
    data: data ? data : ({ id: petID } as IDog),
  });

  const correctTypeError = useMemo(() => {
    if (state && typeof state.error === 'object') {
      return state.error as PartialDog;
    }
    return undefined;
  }, [state]);

  if (!data) {
    return <div>... Загружаем данные</div>;
  }

  return (
    <PageCover title="Расскижите о вашем питомце">
      <Form
        formAction={formAction}
        href="/profile"
        buttonState={isPading}
        errorMessage={state.message}
      >
        <DogForm errors={correctTypeError} data={data} />
      </Form>
    </PageCover>
  );
};

export default PetEdit;
