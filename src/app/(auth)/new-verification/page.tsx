import NewVerificationForm from '@/components/auth/NewVerificationForm';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl">Email verification</h1>
      <NewVerificationForm />
      <p className="text-center text-sm text-gray-600 mt-2">
        Back to&nbsp;
        <Link className="text-blue-500 hover:underline" href="/login">
          Login
        </Link>
      </p>
    </div>
  );
}
