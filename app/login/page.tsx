'use client';

import PageCover from '@app/_ui/PageCover';
import { Suspense } from 'react';
import LoginForm from '@app/_ui/login-form';

const page = () => (
  <PageCover title="Пожалуйся войдите в систему">
    <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  </PageCover>
);

export default page;
