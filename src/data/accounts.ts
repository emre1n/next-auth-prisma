import prisma from '@/libs/prisma';

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: {
        userId,
      },
    });

    return account;
  } catch (error) {
    console.error('Error getting account by userId:', error);
    return null;
  }
};
