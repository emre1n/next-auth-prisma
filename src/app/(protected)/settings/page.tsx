import UserInfo from '@/components/auth/UserInfo';
import { currentUser } from '@/libs/auth';

export default async function Page() {
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-4 p-4">
      <UserInfo user={user} label="User Info" />
    </div>
  );
}
