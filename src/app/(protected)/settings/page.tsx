import { auth, signOut } from '@/auth';
import Button from '@/components/ui/Button';

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl">You are in!</h2>
      <p>{JSON.stringify(session?.user?.email)}</p>
      <form
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}
