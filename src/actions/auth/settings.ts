'use server';

import { generateVerificationToken } from '@/data/tokens';
import { getUserByEmail, getUserById, updateUserById } from '@/data/user';
import { currentUser } from '@/libs/auth';
import type { SettingsFormValueType } from '@/libs/constants/USER_SETTINGS_SCHEMA';
import { sendVerificationEmail } from '@/libs/mail';
import bcrypt from 'bcryptjs';

export default async function settings(values: SettingsFormValueType) {
  const user = await currentUser();

  if (!user) {
    return { success: false, message: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id || '');

  if (!dbUser) {
    return { success: false, message: 'Unauthorized' };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { success: false, message: 'Email already in use!' };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return {
      success: true,
      message: 'Verification email sent!',
    };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordsMatch) {
      return { success: false, message: 'Incorrect password!' };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  return await updateUserById(dbUser.id, values);
}
