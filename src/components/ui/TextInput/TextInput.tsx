'use client';

import { ControllerRenderProps, FieldErrors } from 'react-hook-form';

import FieldWrapper from '../FieldWrapper';

interface TextInputProps {
  field: ControllerRenderProps;
  label: string;
  errors: FieldErrors;
  placeholder?: string;
}

export default function TextInput({
  field,
  label,
  errors,
  placeholder,
}: TextInputProps) {
  return (
    <FieldWrapper label={label} error={errors[field.name]?.message?.toString()}>
      <input
        className="h-10 w-full rounded-md border px-3 py-2 text-sm"
        {...field}
        placeholder={placeholder}
      />
    </FieldWrapper>
  );
}
