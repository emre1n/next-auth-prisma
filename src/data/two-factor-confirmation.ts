import prisma from '@/libs/prisma';

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique(
      {
        where: {
          userId,
        },
      },
    );

    return twoFactorConfirmation;
  } catch (error: any) {
    throw new Error(error);
  }
};
