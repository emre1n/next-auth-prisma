import SignUpForm from '@/components/SignUpForm/';

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="text-2xl">SignUp</h1>
      <SignUpForm />
    </div>
  );
}
