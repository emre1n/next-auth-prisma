'use server';

import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import {
  NewPasswordFormValuesType,
  USER_NEW_PASSWORD_VALIDATION_SCHEMA,
} from '@/libs/constants/USER_NEW_PASSWORD_VALIDATION_SCHEMA';
import prisma from '@/libs/prisma';
import { hash } from 'bcryptjs';

export async function newPassword(
  data: NewPasswordFormValuesType,
  token?: string | null,
) {
  if (!token) {
    return { success: false, message: 'Missing token!' };
  }

  const validatedFields = USER_NEW_PASSWORD_VALIDATION_SCHEMA.safeParse(data);

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid fields!' };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { success: false, message: 'Invalid token!' };
  }

  const hasExpired = new Date() > new Date(existingToken.expiresAt);

  if (hasExpired) {
    return { success: false, message: 'Token has expired' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { success: false, message: 'User not found!' };
  }

  const hashedPassword = await hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: true, message: 'Password updated successfully' };
}
