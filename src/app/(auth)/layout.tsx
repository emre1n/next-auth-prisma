import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="h-full flex flex-col justify-center items-center">
      <div className="bg-slate-200 p-6 rounded-md w-full max-w-80">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
