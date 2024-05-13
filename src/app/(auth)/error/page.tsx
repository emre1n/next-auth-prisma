import ErrorCard from '@/components/auth/ErrorCard';

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="text-2xl">Something went wrong!</h1>
      <ErrorCard />
    </div>
  );
}
