import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import CREATE_VALIDATION_SCHEMA from '@/modules/user/lib/constants/CREATE_VALIDATION_SCHEMA';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, name, password } =
      CREATE_VALIDATION_SCHEMA.parse(body);

    // Check if the email is already in use
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Check if the username is already in use
    const existingUserByUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: 'User with this username already exists' },
        { status: 409 }
      );
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

    return NextResponse.json(
      {
        user: userWithoutPassword,
        message: 'User successfully created',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Something went wrong!',
      },
      { status: 500 }
    );
  }
}
