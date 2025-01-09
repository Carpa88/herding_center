"use client"

import PageCover from '@app/ui/PageCover'
import { useParams } from 'next/navigation';

const trial  = {
  id: '23648723648',
  name: 'string',
  start_at: 'string',
  ends_on: 'string',
  judge_id: 'string',
  description: "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu."}

const Page = () => {
  const { id } = useParams();
  console.log(id);
  const title = 'Название соревнования'
  return (
    <PageCover title={title}>
    <div>
      <p className="mt-1 max-w-2xl text-sm/6 text-slate-500">{trial.description}</p>
      <div className="mt-6 border-t border-slate-100">
        <dl className="divide-y divide-slate-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-slate-900">Время проведения соревнований:</dt>
            <dd className="mt-1 text-sm/6 text-slate-700 sm:col-span-2 sm:mt-0">{trial.start_at} - {trial.ends_on}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-slate-900">Судья:</dt>
            <dd className="mt-1 text-sm/6 text-slate-700 sm:col-span-2 sm:mt-0">{trial.judge_id}</dd>
          </div>
        </dl>
      </div>
    </div>

    </PageCover>
  )
}

export default Page;