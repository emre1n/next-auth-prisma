import authConfig from '@/auth.config';
import { getAccountByUserId } from '@/data/accounts';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
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
    signIn: async signInParams => {
      // Allow OAuth providers to sign in without email verification
      if (signInParams.account?.provider !== 'credentials') return true;

      const existingUser = await getUserById(signInParams.user?.id || '');

      // If user is not found or email is not verified, prevent sign in
      if (!existingUser?.emailVerified) return false;

      // If two-factor authentication is enabled, prevent sign in
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        if (!twoFactorConfirmation) return false;

        // Delete the two-factor confirmation record after successful sign in
        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    jwt: async jwtParams => {
      if (!jwtParams.token.sub) return jwtParams.token;

      const existingUser = await getUserById(jwtParams.token.sub);

      if (!existingUser) return jwtParams.token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      jwtParams.token.isOAuth = !!existingAccount;
      jwtParams.token.name = existingUser.name;
      jwtParams.token.email = existingUser.email;
      jwtParams.token.role = existingUser.role;
      jwtParams.token.image = existingUser.image;
      jwtParams.token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return jwtParams.token;
    },
    session: async sessionParams => {
      if (sessionParams.token.sub && sessionParams.session.user) {
        sessionParams.session.user.id = sessionParams.token.sub;
      }

      if (sessionParams.token.role && sessionParams.session.user) {
        sessionParams.session.user.role = sessionParams.token.role as UserRole;
      }

      if (sessionParams.session.user) {
        sessionParams.session.user.isTwoFactorEnabled = sessionParams.token
          .isTwoFactorEnabled as boolean;
      }

      if (sessionParams.session.user) {
        sessionParams.session.user.name = sessionParams.token.name as string;
        sessionParams.session.user.email = sessionParams.token.email as string;
        sessionParams.session.user.role = sessionParams.token.role as UserRole;
        sessionParams.session.user.image = sessionParams.token.image as string;
        sessionParams.session.user.isOAuth = sessionParams.token
          .isOAuth as boolean;
      }

      return sessionParams.session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
});
