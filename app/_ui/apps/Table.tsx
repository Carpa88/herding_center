'use client';

import { UpdateButtonIcon } from '@app/_ui/buttons';
import { colApps } from '@app/trials/consts';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchFilteredApps } from '@app/trials/[id]/participants/actions';
import { IFullApp } from '@app/trials/[id]/app/type';
import { PET_SEX } from '@app/pet/consts';

const SorryText = () => (
  <div className="w-full text-md font-medium text-textPrimary text-center">
    Нет данных, соответствующих Вашему запросу
  </div>
);

const Table = ({
  query,
  currentPage,
  id,
}: {
  query: string;
  currentPage: number;
  id: string;
}) => {
  const [currentData, setCurrentData] = useState<IFullApp[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFilteredApps(query, currentPage, id);
        if (!result.data) {
          console.error('Данные не найдены');
          setCurrentData(null);
        } else {
          setCurrentData(
            result.data.map(item => ({
              ...item,
              sex:
                (PET_SEX.find(v => v.value === item.sex)?.label as string) ||
                item.sex,
            })),
          );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setCurrentData(null);
      }
    };

    fetchData();
  }, [query, currentPage, id]);

  // const handleClick = async (id: string): Promise<void> => {
  //   const result = await deleteTrial(id);
  //   if (!result.error) {
  //     console.error(result.message);
  //   } else {
  //     setCurrentData((currentData || []).filter(item => item.id !== id));
  //   }
  // };
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg p-2 md:pt-0">
          {currentData?.length ? (
            <>
              <div className="md:hidden">
                {currentData?.map(item => (
                  <div
                    key={item.id}
                    className="mb-2 w-full rounded-md bg-bgDefault p-4"
                  >
                    <div className="flex w-full items-center justify-between">
                      <div>
                        <p className="text-xl font-medium text-textPrimary">
                          <Link href={`/trials/${id}/participants/${item.id}`}>
                            {item.name}
                          </Link>
                        </p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <UpdateButtonIcon href={`/trials/${item.id}/edit`} />
                        {/* <DeleteButton onClick={() => handleClick(item.id)} /> */}
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <p>
                            <span className="text-sm text-textSecondary font-machine">
                              Хозяин:
                            </span>{' '}
                            {item.user_name} - {item.phone}
                          </p>
                        </div>
                        <p className="text-sm text-textSecondary">
                          {item.breed} - {item.sex} - {item.birth_year}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full text-textPrimary md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    {colApps.map(col => (
                      <th
                        scope="col"
                        className="px-4 py-5 font-medium sm:pl-6 text-left"
                        key={col.key}
                      >
                        {col.label}
                      </th>
                    ))}
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Исправить</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-bgDefault">
                  {currentData?.map(item => (
                    <tr
                      key={item.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      {colApps.map(col => {
                        const value = item[col.key as keyof IFullApp];
                        return col.key === 'name' ? (
                          <td
                            className="whitespace-nowrap py-3 pl-6 underline underline-offset-2 hover:text-buttonHover"
                            key={col.key}
                          >
                            <Link
                              href={`/trials/${id}/participants/${item.id}`}
                              className="hover:underline underline-offset-2 decoration-current"
                            >
                              {value}
                            </Link>
                          </td>
                        ) : (
                          <td
                            className="whitespace-nowrap py-3 pl-6"
                            key={col.key}
                          >
                            {value}
                          </td>
                        );
                      })}
                      {/* <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateButtonIcon href={`/trials/${item.id}/edit`} />
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <SorryText />
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
