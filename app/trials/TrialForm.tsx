'use client';

import Input from '@app/_ui/form/Input';
import Section from '@app/_ui/form/Section';
import { ITrial, PartialTrial } from './types';
import TextAria from '@app/_ui/form/TextAria';
import { fetchTrial } from './(overview)/actions';
import { useEffect, useState } from 'react';

const TrialForm = ({
  errors,
  id,
  title,
  description,
}: {
  errors?: PartialTrial;
  id?: string;
  title?: string;
  description?: string;
}) => {
  const [data, setData] = useState<ITrial | null>(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchData = async () => {
      try {
        const trial = await fetchTrial(id);
        setData(trial.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    return <div>... Загружаем данные</div>;
  }
  return (
    <Section title={title} description={description}>
      <Input
        name="name"
        label="Название соревнования"
        errors={errors?.name}
        value={data?.name || ''}
        col={2}
      />
      <Input
        name="judge_id"
        label="Имя судьи"
        errors={errors?.judge_id}
        value={data?.judge_id}
      />
      <Input
        name="start_at"
        label="Начало в"
        errors={errors?.start_at}
        value={data?.start_at}
      />
      <Input
        name="ends_on"
        label="Конец"
        errors={errors?.ends_on}
        value={data?.ends_on}
      />
      <TextAria
        name="description"
        label="Описание"
        errors={errors?.description}
        value={data?.description}
        col={2}
      />
    </Section>
  );
};

export default TrialForm;
