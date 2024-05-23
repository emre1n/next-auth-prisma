'use client';

import FormToaster from '@/components/auth/FormToaster';
import type { FormToasterProps } from '@/components/auth/FormToaster/FormToaster';
import RoleGate from '@/components/auth/RoleGate';
import Button from '@/components/ui/Button';
import { UserRole } from '@prisma/client';
import { useState } from 'react';

export default function Page() {
  const [apiCallStatus, setApiCallStatus] = useState<{
    status: 'success' | 'error' | undefined;
    message: string | undefined;
  }>({ status: undefined, message: '' });
  const [showApiCallStatus, setShowApiCallStatus] = useState(true);

  const onApiRouteClick = () => {
    fetch('/api/admin').then(response => {
      if (response.ok) {
        setApiCallStatus({
          status: 'success',
          message: 'Allowed API Route!',
        });
        displayApiCallStatus();
      } else {
        setApiCallStatus({
          status: 'error',
          message: 'Forbidden API Route!',
        });
        displayApiCallStatus();
      }
    });
  };

  const hideApiCallStatus = () => {
    setTimeout(() => {
      setShowApiCallStatus(false);
    }, 3000);
  };

  const displayApiCallStatus = () => {
    setShowApiCallStatus(true);
    hideApiCallStatus();
  };

  const adminContent: FormToasterProps = {
    state: 'success',
    message: 'You are allowed to see this content!',
  };

  return (
    <div className="w-full flex flex-col gap-8 bg-slate-100 p-6 rounded-md max-w-80 shadow-md">
      <h1 className="text-2xl">Admin Page</h1>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormToaster
          state={adminContent.state}
          message={adminContent.message}
        />
      </RoleGate>
      <div className="flex flex-col gap-4 items-center justify-between rounded-lg border p-3 shadow-md">
        <p className="text-sm font-medium">Admin-only API Route</p>
        {showApiCallStatus && (
          <FormToaster
            state={apiCallStatus.status}
            message={apiCallStatus.message}
          />
        )}
        <Button onClick={onApiRouteClick}>Click to test</Button>
      </div>
      <div className="flex flex-col gap-4 items-center justify-between rounded-lg border p-3 shadow-md">
        <p className="text-sm font-medium">Admin-only Server Action</p>
        <Button>Click to test</Button>
      </div>
    </div>
  );
}
