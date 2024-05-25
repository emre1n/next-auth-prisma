'use server';

import { getUserById, updateUserById } from '@/data/user';
import { currentUser } from '@/libs/auth';
import type { SettingsFormValueType } from '@/libs/constants/USER_SETTINGS_SCHEMA';

export default async function settings(values: SettingsFormValueType) {
  const user = await currentUser();

  if (!user) {
    return { success: false, message: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id || '');

  if (!dbUser) {
    return { success: false, message: 'Unauthorized' };
  }

  return await updateUserById(dbUser.id, values);
}
