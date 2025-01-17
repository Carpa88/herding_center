import Input from '@app/_ui/form/Input';
import Section from '@app/_ui/form/Section';
import { ITrial, PartialTrial } from './types';
import TextAria from '@app/_ui/form/TextAria';

const TrialForm = ({
  errors,
  data,
  title,
  description,
}: {
  errors?: PartialTrial;
  data?: ITrial;
  title?: string;
  description?: string;
}) => (
  <Section title={title} description={description}>
    <Input
      name="name"
      label="Название соревнования"
      errors={errors?.name}
      defaultValue={data?.name}
      col={2}
    />
    <Input
      name="start_at"
      label="Начало в"
      errors={errors?.start_at}
      defaultValue={data?.start_at}
    />
    <Input
      name="ends_on"
      label="Конец"
      errors={errors?.ends_on}
      defaultValue={data?.ends_on}
    />
    <Input
      name="judge_id"
      label="Имя судьи"
      errors={errors?.judge_id}
      defaultValue={data?.judge_id}
    />
    <TextAria
      name="description"
      label="Описание"
      errors={errors?.description}
      defaultValue={data?.description}
      col={2}
    />
  </Section>
);

export default TrialForm;
