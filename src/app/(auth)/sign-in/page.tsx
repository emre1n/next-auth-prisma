import SignInForm from '@/components/SignInForm';
import { signInUser } from '@/db/';

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="text-2xl">Sign in</h1>
      <SignInForm signInUser={signInUser} />
    </div>
  );
}
