import Image from 'next/image';
import React from 'react';

interface AvatarProps {
  children: React.ReactNode;
  user: Boolean;
  fallbackIcon?: React.ReactNode;
}

export const Avatar = ({ children, user, fallbackIcon }: AvatarProps) => {
  if (!user) {
    return fallbackIcon ? <>{fallbackIcon}</> : null; // Use fallbackIcon when there is no user
  }

  return <div className="rounded-full overflow-hidden">{children}</div>;
};

interface AvatarImageProps {
  src: string;
  alt: string;
}

export const AvatarImage = ({ src, alt }: AvatarImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={32}
      height={32}
      className="w-full h-full object-cover"
    />
  );
};
