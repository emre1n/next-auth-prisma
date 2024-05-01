import NextAuth, { NextAuthConfig, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const BASE_PATH = '/api/auth';

const authOptions: NextAuthConfig = {
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
      async authorize(credentials): Promise<any | null> {
        const { email, password } = credentials;

        const user = {
          id: 1,
          username: 'alice',
          email: 'alice@mail.com',
          password: 'pass',
        };

        if (user.email === email && user.password === password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
