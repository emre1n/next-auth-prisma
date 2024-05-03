import { checkUserExists } from '@/db';
import prisma from '@/libs/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import NextAuth, { NextAuthConfig, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const BASE_PATH = '/api/auth';

const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'alice@mail.com ',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          console.log('Credentials:', credentials); // Log the credentials

          if (!credentials.email || !credentials.password) {
            return null;
          }
          const { email, password } = credentials;

          const existingUser = await checkUserExists(email as string);

          console.log('Existing User:', existingUser); // Log the existing user

          if (!existingUser) {
            return null;
          }
          const passwordMatch = await compare(
            password as string,
            existingUser.password,
          );

          console.log('Password Match:', passwordMatch); // Log the password match result

          if (!passwordMatch) {
            return null;
          }

          return {
            id: `${existingUser.id}`,
            username: existingUser.username,
            email: existingUser.email,
          } as User; // Add 'as User' to specify the type of the returned object
        } catch (error) {
          console.error('Error in authorize function:', error);
          return null;
        }
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
