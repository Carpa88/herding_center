'use client';

import PageCover from '@app/_ui/PageCover';
import { Suspense } from 'react';
import LoginForm from '@app/_ui/login-form';
import Link from '@node_modules/next/link';

const page = () => (
  <PageCover title="Пожалуйся войдите в систему">
    <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
      <Suspense>
        <LoginForm />
      </Suspense>
      <Link
        href="/singup"
        className="w-full text-end underline text-amber-700 hover:text-amber-600"
      >
        Зарегистрироваться
      </Link>
    </div>
  </PageCover>
);

export default page;
