'use client';

import GithubOAuthIcon from '@/components/icons/GithubOAuthIcon';
import GoogleOAuthIcon from '@/components/icons/GoogleOAuthIcon';
import Button from '@/components/ui/Button';
import Separator from '@/components/ui/Separator';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';

type Provider = {
  name: 'google' | 'github';
  icon: JSX.Element;
  status: 'active' | 'passive';
};

const providers: Provider[] = [
  { name: 'google', icon: <GoogleOAuthIcon />, status: 'active' },
  { name: 'github', icon: <GithubOAuthIcon />, status: 'passive' },
];

export default function SocialLogin() {
  const handleOnClick = (provider: Provider['name']) => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <>
      <Separator>OR</Separator>

      <div className="flex flex-col gap-2">
        {providers.map(
          provider =>
            provider.status === 'active' && (
              <Button
                key={provider.name}
                intent="secondary"
                onClick={() => handleOnClick(provider.name)}
                icon={provider.icon}
              >
                Continue with{' '}
                {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
              </Button>
            ),
        )}
      </div>
    </>
  );
}
