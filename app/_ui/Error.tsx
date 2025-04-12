'use client';

import { useEffect } from 'react';

type ErrorProps = {
  message?: string;
};

export default function Error({
  message = 'Произошла ошибка. Попробуйте позже.',
}: ErrorProps) {
  useEffect(() => {
    console.error('Произошла ошибка:', message);
  }, [message]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Ошибка</h1>
      <p className="text-lg text-gray-700">{message}</p>
    </div>
  );
}
