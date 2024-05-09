'use server';

import { getUserByEmail, getUserByUsername } from '@/data/user';
import {
  RegisterFormValuesType,
  USER_REGISTER_VALIDATION_SCHEMA,
} from '@/libs/constants/USER_REGISTER_VALIDATION_SCHEMA';
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

  const { email, username, password } = validatedFields.data;

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
    const existingUserByUsername = await getUserByUsername(username);

    if (existingUserByUsername) {
      return {
        success: false,
        message: 'User with this username already exists',
      };
    }

    // Create a new user
    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return {
      success: true,
      user: userWithoutPassword,
      message: 'User successfully created',
    };
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

export async function getUserFromDb(email: string, pwHash: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }

  // Check if the password matches the hash
  if (pwHash === user.password) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
