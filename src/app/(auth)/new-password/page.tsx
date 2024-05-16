import NewPasswordForm from '@/components/auth/NewPasswordForm';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="text-2xl">Enter a new password</h1>
      <NewPasswordForm />
      <p className="text-center text-xs text-gray-600 mt-2">
        Back to&nbsp;
        <Link className="text-blue-500 hover:underline" href="/login">
          Login
        </Link>
      </p>
    </div>
  );
}
