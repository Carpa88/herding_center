import Input from '@app/_ui/form/Input';
import { FullProfile, PartialFullProfileError } from '../types';
import Section from '@app/_ui/form/Section';

const ProfileForm = ({
  errors,
  data,
}: {
  errors?: PartialFullProfileError;
  data?: FullProfile | null;
}) => (
  <Section>
    <Input
      name="name"
      label="Как к вам обращаться?"
      errors={errors?.name}
      value={data?.name || ''}
      col={2}
    />

    <Input
      name="phone"
      label="Номер телефона"
      errors={errors?.phone}
      value={data?.phone || ''}
    />

    <Input
      name="image_url"
      label="Выберите фото,пожалуйста"
      errors={errors?.image_url}
      type="number"
      value={data?.image_url || ''}
    />
  </Section>
);

export default ProfileForm;
