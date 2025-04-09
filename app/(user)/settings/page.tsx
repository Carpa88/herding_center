'use server';

import { authConfig } from '@app/_configs/auth';
import { getServerSession } from 'next-auth';
import { getProfile } from '../action';
import ClientSettings from './ClientSettings';
import PageCover from '@app/_ui/PageCover';

const Settings = async () => {
  const session = await getServerSession(authConfig);
  const profile = await getProfile(session?.user.id || '1');

  return (
    <PageCover title={session?.user.name || 'Рады приветствовать вас!'}>
      <ClientSettings profile={profile} userID={session?.user.id || '1 '} />
    </PageCover>
  );
};

export default Settings;
