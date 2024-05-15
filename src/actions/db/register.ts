'use server';

import { generateVerificationToken } from '@/data/tokens';
import { getUserByEmail, getUserByName } from '@/data/user';
import {
  RegisterFormValuesType,
  USER_REGISTER_VALIDATION_SCHEMA,
} from '@/libs/constants/USER_REGISTER_VALIDATION_SCHEMA';
import { sendVerificationEmail } from '@/libs/mail';
import prisma from '@/libs/prisma';
import { hash } from 'bcryptjs';

export async function createUser(data: RegisterFormValuesType) {
  const validatedFields = USER_REGISTER_VALIDATION_SCHEMA.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Validation failed',
    };
  }

  const { email, name, password } = validatedFields.data;

  try {
    // Check if the email is already in use
    const existingUserByEmail = await getUserByEmail(email);

    if (existingUserByEmail) {
      return {
        success: false,
        message: 'User with this email already exists',
      };
    }

    // Check if the username is already in use
    const existingUserByName = await getUserByName(name);

    if (existingUserByName) {
      return {
        success: false,
        message: 'User with this name already exists',
      };
    }

    // Create a new user
    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return {
      success: true,
      user: userWithoutPassword,
      message: 'Confirmation email sent!',
    };
  } catch (error) {
    console.error('Error creating user:', error);
  }
}
