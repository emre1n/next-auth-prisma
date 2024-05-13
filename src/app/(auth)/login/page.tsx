import LoginForm from '@/components/auth/LoginForm';

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="text-2xl">Login</h1>
      <LoginForm />
    </div>
  );
}
