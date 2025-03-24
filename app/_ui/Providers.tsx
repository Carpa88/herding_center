'use client';

import { ReactNode } from '@node_modules/@types/react';
import { SessionProvider } from 'next-auth/react';

export const Providers = ({ children }: { children: ReactNode }) => (
  <SessionProvider>{children}</SessionProvider>
);
