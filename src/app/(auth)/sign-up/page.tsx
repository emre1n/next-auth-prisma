import SignUpForm from '@/components/SignUpForm/';
import { createUser } from '@/db/';

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="text-2xl">Sign up</h1>
      <SignUpForm action={createUser} />
    </div>
  );
}
