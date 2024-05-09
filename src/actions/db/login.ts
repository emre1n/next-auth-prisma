'use server';

import { signIn } from '@/auth';
import type { LoginFormValuesType } from '@/libs/constants/USER_LOGIN_VALIDATION_SCHEMA';
import { USER_LOGIN_VALIDATION_SCHEMA } from '@/libs/constants/USER_LOGIN_VALIDATION_SCHEMA';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export async function login(data: LoginFormValuesType) {
  const validatedFields = USER_LOGIN_VALIDATION_SCHEMA.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid fields!',
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            message: 'Invalid credentials!',
          };
        default:
          return {
            success: false,
            message: 'An error occurred!',
          };
      }
    }

    throw error;
  }
}
