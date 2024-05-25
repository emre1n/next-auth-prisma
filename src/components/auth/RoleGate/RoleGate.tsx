import FormToaster from '@/components/auth/FormToaster';
import type { FormToasterProps } from '@/components/auth/FormToaster/FormToaster';
import { useCurrentRole } from '@/hooks/useCurrentRole';
import { UserRole } from '@prisma/client';
import { useSession } from 'next-auth/react';

interface RoleGateProps {
  allowedRole: UserRole;
  children: React.ReactNode;
}

export default function RoleGate({ allowedRole, children }: RoleGateProps) {
  const role = useCurrentRole();
  const { update } = useSession();

  const notAllowedContent: FormToasterProps = {
    state: 'error',
    message: 'You do not have permission to access!',
  };

  if (role !== allowedRole) {
    update();
    return (
      <FormToaster
        state={notAllowedContent.state}
        message={notAllowedContent.message}
      />
    );
  }

  return <>{children}</>;
}
