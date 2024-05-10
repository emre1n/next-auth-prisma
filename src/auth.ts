import authConfig from '@/auth.config';
import prisma from '@/libs/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    jwt: async jwtParams => {
      jwtParams.token.customField = 'test';
      console.log('jwtToken=>', jwtParams.token);

      return jwtParams.token;
    },
    session: async sessionParams => {
      if (sessionParams.token.sub && sessionParams.session.user) {
        sessionParams.session.user.id = sessionParams.token.sub;
      }

      console.log('session=>', {
        sessionToken: sessionParams.token,
        session: sessionParams.session,
      });

      return sessionParams.session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
});
