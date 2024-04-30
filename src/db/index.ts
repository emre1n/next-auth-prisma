'use server';

import prisma from '@/libs/prisma';

import { hash } from 'bcrypt';
import {
  SignUpFormValuesType,
  USER_SIGNUP_VALIDATION_SCHEMA,
} from '@/libs/constants/USER_SIGNUP_VALIDATION_SCHEMA';

export async function createUser(data: SignUpFormValuesType) {
  const { email, username, name, password } =
    USER_SIGNUP_VALIDATION_SCHEMA.parse(data);

  try {
    // Check if the email is already in use
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUserByEmail) {
      throw new Error('User with this email already exists');
    }

    // Check if the username is already in use
    const existingUserByUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUserByUsername) {
      throw new Error('User with this username already exists');
    }

    // Create a new user
    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        name,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    console.log('user created =>', userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // re-throw the error to be handled by the caller
  }
}
