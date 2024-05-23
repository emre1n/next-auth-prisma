import Navbar from '@/components/Navbar';
import { currentUser } from '@/libs/auth';
import '@/styles/globals.css';
import type { Metadata } from 'next';
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
  const user = await currentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}
