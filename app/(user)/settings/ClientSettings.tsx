'use client';

import Form from '@app/_ui/form/Form';
import ProfileForm from './ProfileForm';
import { useActionState, useMemo } from 'react';
import { FullProfile, PartialFullProfileError } from '../types';
import { setProfile } from '../action';
import { IResponseData } from '@app/_lib/types';

const ClientSettings = ({
  profile,
  userID,
}: {
  profile: IResponseData<FullProfile, string | Error>;
  userID: string;
}) => {
  const [state, formAction, isPading] = useActionState(
    setProfile,
    profile.data
      ? profile
      : { error: '', message: '', data: { user_id: userID, id: '' } },
  );

  const correctTypeError = useMemo(() => {
    if (state && typeof state.error === 'object') {
      return state.error as PartialFullProfileError;
    }
    return undefined;
  }, [state]);

  return (
    <Form
      formAction={formAction}
      href="/profile"
      buttonState={isPading}
      errorMessage={state.message}
    >
      <ProfileForm errors={correctTypeError} data={profile.data} />
    </Form>
  );
};

export default ClientSettings;
