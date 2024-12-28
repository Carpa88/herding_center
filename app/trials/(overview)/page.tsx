import { CreateButton } from '@app/ui/buttons'
import Search from '@app/ui/Search'
import React from 'react'

const page = () => {
  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Поиск по соревнованиям..." />
        <CreateButton href="/trials/create" name="Создать соревнование" />
      </div>
    </div>
  )
}

export default page