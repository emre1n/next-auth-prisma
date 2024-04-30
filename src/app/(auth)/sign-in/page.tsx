import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl">Sign in</h1>
      <Link
        className="bg-slate-500 text-white px-4 py-2 rounded-lg"
        href="/sign-up"
      >
        Sign Up
      </Link>
    </div>
  );
}
