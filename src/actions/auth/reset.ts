'use server';

import { generatePasswordResetToken } from '@/data/tokens';
import { getUserByEmail } from '@/data/user';
import {
  ResetFormValuesType,
  USER_PASSWORD_RESET_VALIDATION_SCHEMA,
} from '@/libs/constants/USER_PASSWORD_RESET_VALIDATION_SCHEMA';
import { sendPasswordResetEmail } from '@/libs/mail';

export async function resetPassword(data: ResetFormValuesType) {
  const validatedFields = USER_PASSWORD_RESET_VALIDATION_SCHEMA.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid email!',
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email) {
    return {
      success: false,
      message: 'Email does not exist!',
    };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return {
    success: true,
    message: 'Password reset email sent!',
  };
}
