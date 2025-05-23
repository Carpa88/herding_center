'use client';

import Input from '@app/_ui/form/Input';
import Section from '@app/_ui/form/Section';
import { ITrial, PartialTrial } from '@app/trials/types';
import TextAria from '@app/_ui/form/TextAria';
import { fetchTrial } from '@app/trials/actions';
import { useEffect, useState } from 'react';
import Checkbox from '@app/_ui/form/Checkbox';

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
        setAgreed(trial.data?.is_active || false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const [agreed, setAgreed] = useState<boolean>(false);
  const handleCheckboxChange = (value: boolean) => {
    setAgreed(value);
  };

  if (!data && id) {
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
      <Checkbox
        name="is_active"
        label="Позволить пользователям записываться на это соревнование?"
        checked={agreed}
        onChange={handleCheckboxChange}
        errors={errors?.is_active}
      />
    </Section>
  );
};

export default TrialForm;
