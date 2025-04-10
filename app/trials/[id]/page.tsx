import PageCover from '@app/_ui/PageCover';
import { fetchTrial } from '@app/trials/actions';
import { format } from 'date-fns';
import { Item } from '@app/_ui/Item';

const TrialPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const trialID = (await params).id;
  const trial = await fetchTrial(trialID);
  const data = trial.data;

  if (!data) {
    return <p>{trial.message}</p>;
  }
  const dateCreated = data.created_at
    ? format(new Date(data.created_at), 'yyyy-MM-dd')
    : 'Дата неизвестна';

  return (
    <PageCover title={data.name}>
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
