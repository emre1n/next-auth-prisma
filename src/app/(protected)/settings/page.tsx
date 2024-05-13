import { auth, signOut } from '@/auth';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default async function Page() {
  const session = await auth();

  const user = session?.user;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl">You are in!</h2>

      <div>
        {user &&
          Object.entries(user).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {value}
            </div>
          ))}
      </div>
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
