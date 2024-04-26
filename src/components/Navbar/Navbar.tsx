import Link from 'next/link';
import Button from '../ui/Button';

const Navbar = () => {
  return (
    <div className="bg-zinc-100 py-2 px-4 border-b border-s-zinc-200 fixed flex justify-center w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">202</Link>
        <Link
          className="px-4 py-2 bg-zinc-800 rounded-lg text-white"
          href="/sign-in"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
