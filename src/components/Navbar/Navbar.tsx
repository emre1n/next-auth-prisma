'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '../ui/Button';

const Navbar = () => {
  const router = useRouter();

  function handleSignInButtonClick() {
    router.push('/login');
  }

  return (
    <div className="bg-secondary py-2 px-4 border-b border-accent flex justify-center w-full">
      <div className="container flex items-center justify-between">
        <Link href="/">202</Link>
        <Button
          intent="primary"
          size="normal"
          onClick={handleSignInButtonClick}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
