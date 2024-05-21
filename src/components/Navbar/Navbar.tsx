'use client';

import { logout } from '@/actions/auth/logout';
import DropdownMenu from '@/components/DropdownMenu';
import UserIcon from '@/components/icons/UserIcon';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
            {!!user ? (
              <Image
                className="rounded-full"
                src={user?.image || ''}
                height={32}
                width={32}
                alt="User Profile"
              />
            ) : (
              <UserIcon />
            )}
          </div>
          <DropdownMenu
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            items={[
              { label: 'Logout', onClick: handleSignOutButtonClick },
              { label: 'Login', onClick: handleSignInButtonClick },
              { label: 'Settings', onClick: handleSettingsButtonClick },
              { label: 'Admin', onClick: handleAdminButtonClick },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
