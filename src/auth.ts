import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';
import prisma from '@/libs/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import NextAuth from 'next-auth';

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    linkAccount: async linkAccountParams => {
      await prisma.user.update({
        where: { id: linkAccountParams.user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    jwt: async jwtParams => {
      if (!jwtParams.token.sub) return jwtParams.token;

      const existingUser = await getUserById(jwtParams.token.sub);

      if (!existingUser) return jwtParams.token;

      jwtParams.token.role = existingUser.role;

      return jwtParams.token;
    },
    session: async sessionParams => {
      if (sessionParams.token.sub && sessionParams.session.user) {
        sessionParams.session.user.id = sessionParams.token.sub;
      }

      if (sessionParams.token.role && sessionParams.session.user) {
        sessionParams.session.user.role = sessionParams.token.role as UserRole;
      }

      return sessionParams.session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
});
