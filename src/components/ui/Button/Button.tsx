'use client';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  pending?: boolean;
}

export default function Button({
  onClick,
  children,
  type = 'button',
  disabled = false,
  pending = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={pending}
      className="px-4 py-2 bg-zinc-800 rounded-lg text-zinc-100"
    >
      {pending ? <span className="loading loading-spinner"></span> : children}
    </button>
  );
}
