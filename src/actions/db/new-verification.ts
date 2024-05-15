'use server';

import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';
import prisma from '@/libs/prisma';

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      success: false,
      message: 'Token does not exist!',
    };
  }

  const hasExpired = new Date() > new Date(existingToken.expiresAt);

  if (hasExpired) {
    return {
      success: false,
      message: 'Token has expired!',
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      success: false,
      message: 'Email does not exist!',
    };
  }

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: true,
    message: 'Email verified!',
  };
};
