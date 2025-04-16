import PageCover from '@app/_ui/PageCover';
import { fetchTrial, getLastTrial } from '@app/trials/actions';
import { format } from 'date-fns';
import { Item } from '@app/_ui/Item';
import { ParamsType } from '@app/_lib/types';
import { getServerSession } from 'next-auth';
import { authConfig } from '@app/_configs/auth';

const TrialPage = async ({ params }: ParamsType) => {
  const session = await getServerSession(authConfig);
  const trialID = (await params).id;
  const trial = await fetchTrial(trialID);
  const lastTrial = await getLastTrial();
  const data = trial.data;

  if (!data) {
    return <p>{trial.message}</p>;
  }
  const dateCreated = data.created_at
    ? format(new Date(data.created_at), 'yyyy-MM-dd')
    : 'Дата неизвестна';

  const isLast = trial?.data?.id === lastTrial?.data?.id;

  const rightButton = () => {
    const props: { href?: string; name?: string; plus?: boolean } = {};
    if (session?.user?.role === 'admin' && isLast) {
      props.href = `/trials/${trialID}/participants`;
      props.name = 'Список участников';
      props.plus = false;
    } else if (session?.user?.role === 'user' && isLast) {
      props.href = `/trials/${trialID}/app`;
      props.name = 'Записаться на соревнование';
      props.plus = true;
    } else {
      props.href = '';
      props.name = '';
      props.plus = true;
    }
    return props;
  };
  const but = rightButton();

  return (
    <PageCover
      title={data.name}
      href={but.href}
      name={but.name}
      plus={but.plus}
    >
      <div>
        <p className="mt-1 max-w-2xl text-sm/6 text-slate-500">
          {trial.data?.description}
        </p>
        <div className="mt-6 border-t border-slate-100">
          <dl className="divide-y divide-slate-100">
            <Item
              name="Время проведения соревнований:"
              value={`${data.start_at} - ${data.ends_on}`}
            />
            <Item name="Судья:" value={data.judge_id} />
            <Item name="Дата создания записи:" value={dateCreated} />
          </dl>
        </div>
      </div>
    </PageCover>
  );
};

export default TrialPage;
