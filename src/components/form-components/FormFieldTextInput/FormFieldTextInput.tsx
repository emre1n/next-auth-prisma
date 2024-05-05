'use client';

import TextInput from '@/components/ui/TextInput';
import { Controller, useFormContext } from 'react-hook-form';

interface FormFieldTextInputProps {
  label: string;
  fieldName: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
}

export default function FormFieldTextInput({
  label,
  fieldName,
  disabled,
  placeholder,
}: FormFieldTextInputProps) {
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
        <TextInput
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
