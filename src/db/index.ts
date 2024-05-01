'use server';

import prisma from '@/libs/prisma';

import { hash } from 'bcrypt';
import { SignUpFormValuesType } from '@/libs/constants/USER_SIGNUP_VALIDATION_SCHEMA';

export async function createUser(data: SignUpFormValuesType) {
  const { email, username, name, password } = data;

  try {
    // Check if the email is already in use
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUserByEmail) {
      return {
        success: false,
        message: 'User with this email already exists',
      };
    }

    // Check if the username is already in use
    const existingUserByUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

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
        name,
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
