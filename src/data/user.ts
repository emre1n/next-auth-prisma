import prisma from '@/libs/prisma';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
};

export const getUserByName = async (name: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        name,
      },
    });

    return user;
  } catch (error) {
    console.error('Error getting user by name:', error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    console.error('Error getting user by id:', error);
    return null;
  }
};

export const updateUserById = async (id: string, data: any) => {
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: { ...data },
    });

    return {
      success: true,
      message: 'Settings updated',
    };
  } catch (error) {
    console.log('Error updating user:', error);
    return {
      success: false,
      message: 'Failed to update settings',
    };
  }
};
