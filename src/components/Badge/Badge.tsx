import clsxWithMerge from '@/helpers/clsx-with-merge';
import { cva } from 'class-variance-authority';

interface BadgeProps {
  intent: 'success' | 'error';
  size?: 'normal' | 'large';
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  intent,
  size,
  className,
  children,
}: BadgeProps) {
  const badge = cva(['rounded-full', 'text-base-100'], {
    variants: {
      intent: {
        success: ['bg-success'],
        error: ['bg-error'],
      },
      size: {
        normal: ['text-xs', 'py-0.5', 'px-2.5'],
        large: ['text-sm', 'py-1', 'px-3'],
      },
    },
    compoundVariants: [{ intent: 'success', size: 'normal', className: '' }],
    defaultVariants: {
      intent: 'success',
      size: 'normal',
    },
  });

  return (
    <div
      className={badge({ intent, size, className: clsxWithMerge(className) })}
    >
      {children}
    </div>
  );
}
