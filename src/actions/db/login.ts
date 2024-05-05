'use server';

import type { LoginFormValuesType } from '@/libs/constants/USER_LOGIN_VALIDATION_SCHEMA';
import { USER_LOGIN_VALIDATION_SCHEMA } from '@/libs/constants/USER_LOGIN_VALIDATION_SCHEMA';

export async function login(values: LoginFormValuesType) {
  const validatedFields = USER_LOGIN_VALIDATION_SCHEMA.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  return { success: 'Email sent!' };
}
