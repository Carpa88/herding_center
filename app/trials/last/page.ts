import { redirect } from 'next/navigation';
import { getLastTrial } from '../actions';

const LastTrialPage = async () => {
  const trial = await getLastTrial();

  redirect(`/trials/${trial.data?.id}`);
};

export default LastTrialPage;
