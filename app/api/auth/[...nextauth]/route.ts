import NextAuth from 'next-auth';
import { authConfig } from '@app/_configs/auth';

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
