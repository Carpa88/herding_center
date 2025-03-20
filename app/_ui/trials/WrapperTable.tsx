'use client';

import React, { useEffect, useState } from 'react';
import Table from './Table';
import { fetchTrialsPages } from '../../trials/actions';
import Pagination from '@app/_ui/Pagination';
import { useSearchParams } from 'next/navigation';

const WrapperTable = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') || '';
  const currentPage = Number(searchParams?.get('page')) || 1;

  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchTrialsPages(query);
      setTotalPages(result.data || 0);
    };

    fetchData();
  }, [query]);

  return (
    <>
      <Table query={query} currentPage={currentPage} />
      {totalPages >= 1 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
};

export default WrapperTable;
