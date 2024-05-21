'use client';

import UserInfo from '@/components/auth/UserInfo';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function Page() {
  const user = useCurrentUser();

  return (
    <div className="flex flex-col gap-4 p-4">
      <UserInfo user={user} label="User Info" />
    </div>
  );
}
