'use client';

import React, { useEffect, useState } from 'react';
import Table from './Table';
import Pagination from '@app/_ui/Pagination';
import { useSearchParams } from 'next/navigation';
import { fetchAppsPages } from '@app/trials/[id]/participants/actions';

const WrapperTable = ({ id }: { id: string }) => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') || '';
  const currentPage = Number(searchParams?.get('page')) || 1;

  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAppsPages(query, id);
      setTotalPages(result.data || 1);
    };

    fetchData();
  }, [query, id]);

  return (
    <>
      <Table query={query} currentPage={currentPage} id={id} />
      {totalPages >= 1 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
};

export default WrapperTable;
