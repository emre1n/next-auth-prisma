'use client';

import Link from 'next/link';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  function handleSignInButtonClick() {
    router.push('/sign-in');
  }

  return (
    <div className="bg-zinc-100 py-2 px-4 border-b border-s-zinc-200 fixed flex justify-center w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">202</Link>
        <Button onClick={handleSignInButtonClick}>Sign in</Button>
      </div>
    </div>
  );
};

export default Navbar;
