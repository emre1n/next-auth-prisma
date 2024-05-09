import { auth, signOut } from '@/auth';
import Button from '@/components/ui/Button';

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <h2>Settings</h2>
      <p>{JSON.stringify(session)}</p>
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
