'use server'

import PageCover from '@app/_ui/PageCover'
import { fetchTrial } from '../../actions'
import { format } from 'date-fns'

const Item = ({name, value}: {name: string; value: string}) => (
  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-sm/6 font-medium text-slate-900">{name}</dt>
    <dd className="mt-1 text-sm/6 text-slate-700 sm:col-span-2 sm:mt-0">{value}</dd>
  </div>
);

const Page = async({ params,
}: {
  params: Promise<{ id: string }>
}) => {
  const trialID = (await params).id;
  const trial = await fetchTrial(trialID);
  const dateCreated = format(new Date(trial[0].created_at), 'yyyy-MM-dd ');

  return (
    <PageCover title={trial[0].name}>
      <div>
        <p className="mt-1 max-w-2xl text-sm/6 text-slate-500">{trial[0].description}</p>
        <div className="mt-6 border-t border-slate-100">
          <dl className="divide-y divide-slate-100">
            <Item name='Время проведения соревнований:' value={`${trial[0].start_at} - ${trial[0].ends_on}`} />
            <Item name='Судья:' value={trial[0].judge_id} />
            <Item name='Дата создания записи:' value={dateCreated} />
          </dl>
        </div>
      </div>
    </PageCover>
  )
}

export default Page;