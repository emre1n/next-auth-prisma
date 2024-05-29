import UserSettingsForm from '@/components/auth/UserSettingsForm';
import { currentUser } from '@/libs/auth';

export default async function Page() {
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-4">
      <UserSettingsForm user={user} label="User Settings" />
    </div>
  );
}
