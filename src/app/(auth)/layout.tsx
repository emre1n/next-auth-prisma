import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="main-height flex flex-col justify-center items-center pb-12">
      <div className="bg-slate-200 p-6 rounded-md w-full max-w-80 shadow-md">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
