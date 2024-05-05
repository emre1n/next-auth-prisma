'use client';

import PasswordInput from '@/components/ui/PasswordInput';
import { Controller, useFormContext } from 'react-hook-form';

interface FormFieldPasswordInputProps {
  label: string;
  fieldName: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
}

export default function FormFieldPasswordInput({
  label,
  fieldName,
  disabled,
  placeholder,
}: FormFieldPasswordInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <PasswordInput
          field={field}
          label={label}
          errors={errors}
          disabled={disabled}
          placeholder={placeholder}
        />
      )}
    />
  );
}
