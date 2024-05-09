import { auth } from '@/auth';
import LoginForm from '@/components/LoginForm';

export default async function Page() {
  const session = await auth();

  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="text-2xl">Login</h1>
      <p>{session ? JSON.stringify(session?.user?.email) : 'no session'}</p>
      <LoginForm />
    </div>
  );
}
