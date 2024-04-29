'use client';

import { ControllerRenderProps, FieldErrors } from 'react-hook-form';

import FieldWrapper from '../FieldWrapper';

interface TextInputProps {
  field: ControllerRenderProps;
  label: string;
  errors: FieldErrors;
  placeholder?: string;
}

export default function Textarea({
  field,
  label,
  errors,
  placeholder,
}: TextInputProps) {
  return (
    <FieldWrapper label={label} error={errors[field.name]?.message?.toString()}>
      <textarea
        className="border w-full"
        rows={5}
        placeholder={placeholder}
        {...field}
      ></textarea>
    </FieldWrapper>
  );
}
