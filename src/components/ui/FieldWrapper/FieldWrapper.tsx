'use client';

import clsxWithMerge from '@/helpers/clsx-with-merge';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface FieldWrapperProps {
  children: React.ReactNode;
  label: string;
  error?: string;
  labelPosition?: 'top' | 'right';
}

export default function FieldWrapper({
  children,
  label,
  error,
  labelPosition = 'top',
}: FieldWrapperProps) {
  return (
    <div className="w-full">
      <div
        className={clsxWithMerge(
          'flex gap-1',
          labelPosition === 'top' ? 'flex-col' : 'flex-row-reverse justify-end'
        )}
      >
        {label && (
          <label className="text-xs font-medium leading-none">{label}</label>
        )}
        {children}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
