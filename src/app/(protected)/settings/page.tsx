import UserSettings from '@/components/auth/UserSettings';
import { currentUser } from '@/libs/auth';

export default async function Page() {
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-4">
      <UserSettings user={user} label="User Settings" />
    </div>
  );
}
