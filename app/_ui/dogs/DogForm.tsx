'use client';

import Input from '@app/_ui/form/Input';
import Section from '@app/_ui/form/Section';
import { IDog, IDogCreatedError } from '@app/pet/types';
import { getPet } from '@app/pet/actions';
import { useEffect, useState } from 'react';
import Selected from '../form/Selected';
import { PET_SEX, PET_TYPES } from '@app/pet/consts';

const DogForm = ({
  errors,
  id,
  title,
  description,
}: {
  errors?: Partial<IDogCreatedError>;
  id?: string;
  title?: string;
  description?: string;
}) => (
  // const [data, setData] = useState<IDog | null>(null);
  // useEffect(() => {
  //   if (!id) {
  //     return;
  //   }
  //   const fetchData = async () => {
  //     try {
  //       const pet = await getPet(id);
  //       setData(pet.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  // if (!data && id) {
  //   return <div>... Загружаем данные</div>;
  // }
  <Section title={title} description={description}>
    <Input
      name="name"
      label="Как зовут питомца"
      errors={errors?.name}
      // value={data?.name || ''}
      col={2}
    />
    <Selected
      name="type"
      label="Вид друга"
      errors={errors?.type}
      options={PET_TYPES}
      // value={data?.type}
    />
    <Input
      name="breed"
      label="Какой породы ваш друг?"
      errors={errors?.breed}
      // value={data?.breed}
    />
    <Selected
      name="sex"
      label="Кавалер или дама?"
      options={PET_SEX}
      errors={errors?.breed}
      // value={data?.breed}
    />
    <Input
      name="birth_year"
      label="Год рождения"
      errors={errors?.birth_year}
      type="number"
      // value={data?.birth_year}
    />
  </Section>
);
export default DogForm;
