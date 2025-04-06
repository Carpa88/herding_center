'use client';

import Input from '@app/_ui/form/Input';
import Section from '@app/_ui/form/Section';
import { IDog, IDogCreatedError } from '@app/pet/types';
import Selected from '../form/Selected';
import { PET_SEX, PET_TYPES } from '@app/pet/consts';

const DogForm = ({
  errors,
  data,
}: {
  errors?: Partial<IDogCreatedError>;
  data?: IDog | null;
}) => (
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
      value={
        data
          ? {
              value: data?.type || '',
              label: PET_TYPES.filter(item => data?.type === item.value)[0]
                .label,
            }
          : { value: PET_TYPES[0].value, label: PET_TYPES[0].label }
      }
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
      errors={errors?.breed}
      value={
        data
          ? {
              value: data?.type || '',
              label: PET_SEX.filter(item => data?.sex === item.value)[0].label,
            }
          : { value: PET_SEX[0].value, label: PET_SEX[0].label }
      }
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
export default DogForm;
