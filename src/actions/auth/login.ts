'use server';

import { signIn } from '@/auth';
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from '@/data/tokens';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getUserByEmail } from '@/data/user';
import type { LoginFormValuesType } from '@/libs/constants/USER_LOGIN_VALIDATION_SCHEMA';
import { USER_LOGIN_VALIDATION_SCHEMA } from '@/libs/constants/USER_LOGIN_VALIDATION_SCHEMA';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/libs/mail';
import prisma from '@/libs/prisma';
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

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      success: false,
      message: 'Email does not exist!',
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return {
      success: true,
      message: 'Confirmation email sent!',
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return {
          success: false,
          message: 'Invalid code!',
        };
      }

      if (code !== twoFactorToken.token) {
        return {
          success: false,
          message: 'Invalid code!',
        };
      }

      const hasExpired = new Date() > new Date(twoFactorToken.expiresAt);

      if (hasExpired) {
        return {
          success: false,
          message: 'Code has expired!',
        };
      }

      await prisma.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);

      return { twoFactor: true };
    }
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
