'use client';

import { logout } from '@/actions/auth/logout';
import { Avatar, AvatarImage } from '@/components/Avatar';
import DropdownMenu from '@/components/DropdownMenu';
import UserIcon from '@/components/icons/UserIcon';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const user = useCurrentUser();

  function handleSignInButtonClick() {
    router.push('/login');
    setIsOpen(!isOpen);
  }

  function handleSettingsButtonClick() {
    router.push('/settings');
    setIsOpen(!isOpen);
  }

  function handleAdminButtonClick() {
    router.push('/admin');
    setIsOpen(!isOpen);
  }

  function handleSignOutButtonClick() {
    logout();
    setIsOpen(!isOpen);
  }

  function handleUserDropDownMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="bg-secondary py-2 px-4 border-b border-accent flex justify-center w-full">
      <div className="relative container flex items-center justify-between">
        <Link href="/">202</Link>
        <div className="flex gap-2">
          <div
            className="flex items-center justify-center cursor-pointer rounded-full border w-8 h-8"
            onClick={handleUserDropDownMenu}
          >
            <Avatar user={!!user} fallbackIcon={<UserIcon />}>
              <AvatarImage
                src={user?.image || 'https://github.com/default.png'}
                alt="User Profile"
              />
            </Avatar>
          </div>
          <DropdownMenu
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            items={[
              { label: 'Login', onClick: handleSignInButtonClick },
              { label: 'Settings', onClick: handleSettingsButtonClick },
              { label: 'Admin', onClick: handleAdminButtonClick },
              { label: 'Logout', onClick: handleSignOutButtonClick },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
