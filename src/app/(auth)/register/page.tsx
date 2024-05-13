import { createUser } from '@/actions/db/register';
import RegisterForm from '@/components/auth/RegisterForm';

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="text-2xl">Register</h1>
      <RegisterForm createUser={createUser} />
    </div>
  );
}
