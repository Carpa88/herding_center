'use client';

import { IMAGE } from '@app/pet/consts';
import { IDog } from '@app/pet/types';
import Link from '@node_modules/next/link';
import Image from 'next/image';

const PetList = ({ data }: { data: IDog[] }) => (
  <div className="mx-auto w-full ">
    <dl className="grid w-full sm:grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
      {data?.map(pet => (
        <Link key={pet.id} href={`/pet/${pet.id}`}>
          <div className="bg-bgSoft rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="relative w-full h-60">
              <Image
                src={IMAGE}
                alt="pet's photo"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-textPrimary">
                {pet.name}
              </h3>
              <p className="text-sm text-textDisabled">{pet.breed}</p>
              <p className="text-sm text-textSecondary">{pet.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </dl>
  </div>
);

export default PetList;
