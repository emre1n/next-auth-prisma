'use client';

import settings from '@/actions/auth/settings';
import Button from '@/components/ui/Button';
import { ExtendedUser } from '@/next-auth';
import { useTransition } from 'react';

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export default function UserInfo({ user, label }: UserInfoProps) {
  const [isPending, startTransition] = useTransition();

  const handleUpdateName = () => {
    startTransition(() => {
      settings({ name: 'New Name' });
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-secondary p-6 rounded-lg shadow-sm min-w-80">
      <h2 className="text-2xl">{label}</h2>
      {user && (
        <div className="flex flex-col gap-2">
          <Button onClick={handleUpdateName} disabled={isPending}>
            Update name
          </Button>
        </div>
      )}
    </div>
  );
}
