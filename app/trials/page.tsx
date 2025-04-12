'use client';

import { CreateButton } from '@app/_ui/buttons';
import PageCover from '@app/_ui/PageCover';
import Search from '@app/_ui/Search';
import React, { Suspense } from 'react';
import WrapperTable from '@app/_ui/trials/WrapperTable';
import { TableSkeleton } from '@app/_ui/skeletons';
import { colTrials } from '@app/trials/consts';
import { useSession } from 'next-auth/react';

const TrialsList = () => {
  const session = useSession();
  const CurrentButton = () => {
    if (session.data?.user.role === 'admin') {
      return <CreateButton href="/trials/create" name="Создать соревнование" />;
    } else if (session.data?.user.role === 'user') {
      return (
        <CreateButton href="/trials/last" name="Записаться на соревнования" />
      );
    }
    return null;
  };
  return (
    <PageCover title="Список соревнований">
      <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Suspense>
            <Search placeholder="Поиск по соревнованиям..." />
          </Suspense>
          {CurrentButton()}
        </div>
        <Suspense fallback={<TableSkeleton cols={colTrials} />}>
          <WrapperTable />
        </Suspense>
      </div>
    </PageCover>
  );
};

export default TrialsList;
