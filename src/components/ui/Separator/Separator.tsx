interface SeparatorProps {
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
}

export default function Separator({
  children,
  orientation = 'horizontal',
}: SeparatorProps) {
  if (orientation === 'horizontal') {
    return (
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-primary"></span>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-accent px-2 text-xs">{children}</span>
        </div>
      </div>
    );
  } else if (orientation === 'vertical') {
    return (
      <div className="relative h-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="h-full border-l border-primary"></span>
        </div>
      </div>
    );
  }
}
