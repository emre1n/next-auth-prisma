'use client';

import FieldWrapper from '@/components/ui/FieldWrapper';
import { ControllerRenderProps, FieldErrors } from 'react-hook-form';

interface TextInputProps {
  field: ControllerRenderProps;
  label: string;
  errors: FieldErrors;
  disabled?: boolean;
  placeholder?: string;
}

export default function TextInput({
  field,
  label,
  errors,
  disabled,
  placeholder,
}: TextInputProps) {
  return (
    <FieldWrapper label={label} error={errors[field.name]?.message?.toString()}>
      <input
        type="text"
        className="h-10 w-full rounded-md border px-3 py-2 text-sm"
        {...field}
        disabled={disabled}
        placeholder={placeholder}
      />
    </FieldWrapper>
  );
}
