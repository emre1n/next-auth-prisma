import { auth } from '@/auth';
import Navbar from '@/components/Navbar';
import Toaster from '@/components/ui/Toaster';
import { currentUser } from '@/libs/auth';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mocha Members',
  description: 'Mocha Members is a platform for developers.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = await currentUser();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          <Navbar user={user} />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
