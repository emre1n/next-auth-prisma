interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="main-height w-full flex flex-col gap-y-10 items-center justify-center bg-slate-200">
      <div className="bg-slate-100 p-6 rounded-md w-full max-w-80 shadow-md">
        {children}
      </div>
    </div>
  );
}
