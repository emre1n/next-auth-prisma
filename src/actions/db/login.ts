'use server';

import { signIn } from '@/auth';
import { generateVerificationToken } from '@/data/tokens';
import { getUserByEmail } from '@/data/user';
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

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      success: false,
      message: 'Email does not exist!',
    };
  }

  if (!existingUser.emailVerified) {
    await generateVerificationToken(existingUser.email);
    return {
      success: true,
      message: 'Confirmation email sent!',
    };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
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
            message: 'Something went wrong!',
          };
      }
    }

    throw error;
  }
}
