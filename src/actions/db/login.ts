'use server';

import type { LoginFormValuesType } from '@/libs/constants/USER_LOGIN_VALIDATION_SCHEMA';
import { USER_LOGIN_VALIDATION_SCHEMA } from '@/libs/constants/USER_LOGIN_VALIDATION_SCHEMA';

export async function login(data: LoginFormValuesType) {
  const validatedFields = USER_LOGIN_VALIDATION_SCHEMA.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid fields!',
    };
  }
  return {
    success: true,
    message: 'Email sent!',
  };
}
