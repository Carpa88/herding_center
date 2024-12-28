import { CreateButton } from '@app/ui/buttons'
import PageCover from '@app/ui/PageCover'
import Search from '@app/ui/Search'
import React from 'react'

const page = () => {
  return (
    <PageCover title='Список соревнований'>
      <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Поиск по соревнованиям..." />
          <CreateButton href="/trials/create" name="Создать соревнование" />
        </div>
      </div>
    </PageCover>
  )
}

export default page