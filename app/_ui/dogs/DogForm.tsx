'use client';

import Input from '@app/_ui/form/Input';
import Section from '@app/_ui/form/Section';
import { IDog, IDogCreatedError, Option } from '@app/pet/types';
import Selected from '../form/Selected';
import { PET_SEX, PET_TYPES } from '@app/pet/consts';
import { useState } from 'react';

const DogForm = ({
  errors,
  data,
}: {
  errors?: Partial<IDogCreatedError>;
  data?: IDog | null;
}) => {
  const [sex, setSex] = useState<Option | null>(
    data
      ? {
          value: data.sex,
          label: PET_SEX.filter(item => item.value === data.sex)[0].label,
        }
      : PET_SEX[0],
  );
  const [type, setType] = useState<Option | null>(
    data
      ? {
          value: data.type,
          label: PET_TYPES.filter(item => item.value === data.type)[0].label,
        }
      : PET_TYPES[0],
  );
  return (
    <Section>
      <Input
        name="name"
        label="Как зовут питомца"
        errors={errors?.name}
        value={data?.name || ''}
        col={2}
      />
      <Selected
        name="type"
        label="Вид друга"
        errors={errors?.type}
        options={PET_TYPES}
        value={type}
        onChange={setType}
      />
      <Input
        name="breed"
        label="Какой породы ваш друг?"
        errors={errors?.breed}
        value={data?.breed || ''}
      />
      <Selected
        name="sex"
        label="Кавалер или дама?"
        options={PET_SEX}
        errors={errors?.sex}
        value={sex}
        onChange={setSex}
      />
      <Input
        name="birth_year"
        label="Год рождения"
        errors={errors?.birth_year}
        type="number"
        value={data?.birth_year || ''}
      />
    </Section>
  );
};
export default DogForm;
