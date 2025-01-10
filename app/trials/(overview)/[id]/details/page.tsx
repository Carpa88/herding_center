'use server'

import PageCover from '@app/_ui/PageCover'
import { fetchTrial } from '../../actions'

const Page = async({ params,
}: {
  params: Promise<{ id: string }>
}) => {
  const trialID = (await params).id;
  const trial = await fetchTrial(trialID);

  return (
    <PageCover title={trial[0].name}>
      <div>
        <p className="mt-1 max-w-2xl text-sm/6 text-slate-500">{trial[0].description}</p>
        <div className="mt-6 border-t border-slate-100">
          <dl className="divide-y divide-slate-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-slate-900">Время проведения соревнований:</dt>
              <dd className="mt-1 text-sm/6 text-slate-700 sm:col-span-2 sm:mt-0">{trial[0].start_at} - {trial[0].ends_on}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-slate-900">Судья:</dt>
              <dd className="mt-1 text-sm/6 text-slate-700 sm:col-span-2 sm:mt-0">{trial[0].judge_id}</dd>
            </div>
          </dl>
        </div>
      </div>
    </PageCover>
  )
}

export default Page;