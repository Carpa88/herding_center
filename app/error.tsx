'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Что-то пошло не так 😞</h2>
          <p>{error.message}</p>
          <button onClick={() => reset()}>Попробовать снова</button>
        </div>
      </body>
    </html>
  );
}
