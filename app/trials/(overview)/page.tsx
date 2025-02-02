'use client';

import { CreateButton } from '@app/_ui/buttons';
import PageCover from '@app/_ui/PageCover';
import Search from '@app/_ui/Search';
import React, { Suspense } from 'react';
import WrapperTable from './WrapperTable';
import { TableSkeleton } from '@app/_ui/skeletons';
import { colTrials } from '@app/trials/consts';

const page = () => (
  <PageCover title="Список соревнований">
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Suspense>
          <Search placeholder="Поиск по соревнованиям..." />
        </Suspense>
        <CreateButton href="/trials/create" name="Создать соревнование" />
      </div>
      <Suspense fallback={<TableSkeleton cols={colTrials} />}>
        <WrapperTable />
      </Suspense>
    </div>
  </PageCover>
);

export default page;
