import { fetchTrial } from '@app/trials/actions';
import { ParamsType } from '@app/_lib/types';
import { getServerSession } from 'next-auth';
import { authConfig } from '@app/_configs/auth';
import { getProfile } from '@app/(user)/action';
import { getPets } from '@app/pet/actions';
import ClientTrial from './ClientTrial';
import PageCover from '@app/_ui/PageCover';
import Error from '@app/_ui/Error';

const Application = async ({ params }: ParamsType) => {
  const { id } = await params;
  const trial = await fetchTrial(id);
  const session = await getServerSession(authConfig);
  const profile = await getProfile(session?.user?.id || '');
  const pet = await getPets(session?.user?.id || '');

  if (!trial.data) {
    return <Error />;
  }
  return (
    <PageCover title={trial?.data?.name || 'Открыта запись на соревнования!'}>
      <ClientTrial trial={trial.data} profile={profile.data} pet={pet.data} />
    </PageCover>
  );
};

export default Application;
