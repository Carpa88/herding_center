import Input from '@app/ui/form/Input'
import Section from '@app/ui/form/Section'
import { ITrial, PartialTrial } from './types'

const TrialForm = ({errors, data, title, description}:{errors: PartialTrial; data?: ITrial; title?: string; description?: string}) => {
  return (
    <Section
      title={title}
      description={description}
  >
    <Input name="name" label="Название соревнования" errors={errors?.name} defaultValue={data?.name} />
    <Input name="start_at" label="Начало в" errors={errors?.start_at} defaultValue={data?.start_at}/>
    <Input name="ends_on" label="Конец" errors={errors?.ends_on} defaultValue={data?.ends_on}/>
    <Input name="judge_id" label="Имя судьи" errors={errors?.judge_id} defaultValue={data?.judge_id}/>
    <Input name="description" label="Описание" errors={errors?.description} defaultValue={data?.description}/>
  </Section>
  )
}

export default TrialForm