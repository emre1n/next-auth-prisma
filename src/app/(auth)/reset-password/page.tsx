import ResetForm from '@/components/auth/ResetForm';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="text-2xl">Forgot your password?</h1>
      <ResetForm />
      <p className="text-center text-sm text-gray-600 mt-2">
        Back to&nbsp;
        <Link className="text-blue-500 hover:underline" href="/login">
          Login
        </Link>
      </p>
    </div>
  );
}
