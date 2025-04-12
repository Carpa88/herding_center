'use client';

import { useState } from 'react';
import Section from '@app/_ui/form/Section';
import { IApp, PartialApp } from './type';
import { IDog } from '@app/pet/types';
import RadioGroup from '@app/_ui/form/RadioGroup';
import { Option } from '@app/pet/types';
import DogForm from '@app/_ui/dogs/DogForm';

const AppForm = ({
  title,
  description,
  petData,
}: {
  errors?: PartialApp;
  title?: string;
  description?: string;
  data?: IApp | null;
  petData: IDog[] | null;
}) => {
  const petArray = Array.isArray(petData) ? petData : [];

  const opt = [
    ...petArray.map(item => ({
      label: item.name,
      value: item.id,
    })),
    {
      label: 'Добавлю еще друга',
      value: 'new',
    },
  ];
  const [pet, setPet] = useState<Option>(opt[0]);
  return (
    <Section title={title} description={description} cols={1}>
      <RadioGroup
        name="dog_id"
        label="Выберите питомца для соревнования"
        options={opt}
        selectedValue={pet.value}
        onChange={v =>
          setPet({
            label: opt.find(item => item.value === v)?.label || '',
            value: v,
          })
        }
        cols={1}
      />
      {pet.value === 'new' && (
        <DogForm
          data={petData?.filter(item => item.id === pet.value)[0]}
          border={false}
        />
      )}
    </Section>
  );
};

export default AppForm;
