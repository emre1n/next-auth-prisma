'use client';

import clsxWithMerge from '@/helpers/clsx-with-merge';
import { type VariantProps, cva } from 'class-variance-authority';

const button = cva(
  [
    'flex',
    'items-center',
    'justify-center',
    'gap-2',
    'font-normal',
    'border',
    'rounded-lg',
    'disabled:opacity-25',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      intent: {
        primary: [
          'bg-primary',
          'text-secondary',
          'border-transparent',
          'hover:bg-primary/90',
        ],
        secondary: [
          'bg-secondary',
          'text-primary',
          'border-primary',
          'hover:bg-secondary/90',
        ],
        link: [
          'bg-transparent',
          'text-primary',
          'border-none',
          'hover:underline',
        ],
      },
      size: {
        small: ['text-xs', 'py-1', 'px-2'],
        normal: ['text-sm', 'py-2', 'px-4'],
        large: ['text-lg', 'py-3', 'px-6'],
      },
    },
    compoundVariants: [{ intent: 'primary', size: 'normal', className: '' }],
    defaultVariants: {
      intent: 'primary',
      size: 'normal',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  pending?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = 'button',
  disabled = false,
  pending = false,
  className,
  intent,
  size,
  icon,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={pending}
      className={button({ intent, size, className: clsxWithMerge(className) })}
      {...props}
    >
      {icon}
      {pending ? <span>Loading...</span> : children}
    </button>
  );
};

export default Button;
