interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="main-height w-full flex flex-col gap-y-10 items-center justify-center bg-slate-200">
      {children}
    </div>
  );
}
