// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';

export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/profile', '/pet/:path*'],
};
