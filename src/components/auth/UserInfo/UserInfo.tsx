import Badge from '@/components/Badge';
import { ExtendedUser } from '@/next-auth';

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

interface UserFieldProps {
  label: string;
  value: string | number | null | undefined;
}

const UserField = ({ label, value }: UserFieldProps) => (
  <div className="flex justify-between items-center rounded-lg border p-3">
    <p className="font-semibold">{label}</p>
    <p className="text-sm">{value}</p>
  </div>
);

export default function UserInfo({ user, label }: UserInfoProps) {
  return (
    <div className="flex flex-col gap-4 bg-secondary p-6 rounded-lg shadow-sm min-w-80">
      <h2 className="text-2xl">{label}</h2>
      {user && (
        <div className="flex flex-col gap-2">
          <UserField label="ID" value={user?.id} />
          <UserField label="Name" value={user?.name} />
          <UserField label="Email" value={user?.email} />
          <UserField label="Role" value={user?.role} />
          <div className="flex justify-between items-center rounded-lg border p-3">
            <p className="font-semibold">2FA</p>
            <Badge intent={user?.isTwoFactorEnabled ? 'success' : 'error'}>
              {user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
}
