'use client';

import PasswordInput from '@/components/ui/PasswordInput';
import { Controller, useFormContext } from 'react-hook-form';

interface FormFieldPasswordInputProps {
  label: string;
  fieldName: string;
  type?: string;
  placeholder?: string;
}

export default function FormFieldPasswordInput({
  label,
  fieldName,
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
          placeholder={placeholder}
        />
      )}
    />
  );
}
