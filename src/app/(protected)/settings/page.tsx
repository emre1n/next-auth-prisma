'use client';

import { logout } from '@/actions/auth/logout';
import Button from '@/components/ui/Button';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function Page() {
  const user = useCurrentUser();

  function handleSignOut() {
    logout();
  }

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
      <Button className="w-32" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
}
