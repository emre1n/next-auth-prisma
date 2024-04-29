'use client';

import { ControllerRenderProps, FieldErrors } from 'react-hook-form';

import FieldWrapper from '../FieldWrapper';

interface PasswordInputProps {
  field: ControllerRenderProps;
  label: string;
  errors: FieldErrors;
  placeholder?: string;
}

export default function PasswordInput({
  field,
  label,
  errors,
  placeholder,
}: PasswordInputProps) {
  return (
    <FieldWrapper label={label} error={errors[field.name]?.message?.toString()}>
      <input
        type="password"
        className="h-10 w-full rounded-md border px-3 py-2 text-sm"
        {...field}
        placeholder={placeholder}
      />
    </FieldWrapper>
  );
}
