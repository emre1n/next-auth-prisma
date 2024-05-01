'use client';

import clsxWithMerge from '@/helpers/clsx-with-merge';
import { cva, type VariantProps } from 'class-variance-authority';

const button = cva(
  [
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
          'bg-zinc-800',
          'text-zinc-100',
          'border-transparent',
          'hover:bg-zinc-800/90',
        ],
        secondary: [
          'bg-zinc-100',
          'text-zinc-800',
          'border-zinc-800',
          'hover:bg-zinc-100',
        ],
      },
      size: {
        tiny: ['text-xs', 'py-0.5', 'px-1'],
        small: ['text-sm', 'py-1', 'px-2'],
        normal: ['text-sm', 'py-2', 'px-4'],
        large: ['text-lg', 'py-3', 'px-6'],
      },
    },
    compoundVariants: [{ intent: 'primary', size: 'normal', className: '' }],
    defaultVariants: {
      intent: 'primary',
      size: 'normal',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  pending?: boolean;
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
      {pending ? <span>Loading...</span> : children}
    </button>
  );
};

export default Button;
