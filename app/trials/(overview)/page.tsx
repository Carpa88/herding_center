import { CreateButton } from '@app/ui/buttons'
import PageCover from '@app/ui/PageCover'
import Search from '@app/ui/Search'
import { TableSkeleton } from '@app/ui/skeletons'
import React, { Suspense } from 'react'
import { colTrials } from '../consts'
import Table from './Table'
import { fetchTrialsPages, fetchFilteredTrials } from './actions'

const page = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
})=> {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchTrialsPages(query);
  const data = await fetchFilteredTrials(query, totalPages || 1);
  
  return (
    <PageCover title='Список соревнований'>
      <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Поиск по соревнованиям..." />
          <CreateButton href="/trials/create" name="Создать соревнование" />
        </div>
        <Suspense key={query + currentPage} fallback={<TableSkeleton cols={colTrials} />}>
        <Table data={data} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
      </div>
    </PageCover>
  )
}

export default page