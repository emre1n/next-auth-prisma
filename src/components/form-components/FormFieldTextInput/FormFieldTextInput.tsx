'use client';

import TextInput from '@/components/ui/TextInput';
import { Controller, useFormContext } from 'react-hook-form';

interface FormFieldTextInputProps {
  label: string;
  fieldName: string;
  type?: string;
  placeholder?: string;
}

export default function FormFieldTextInput({
  label,
  fieldName,
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
          placeholder={placeholder}
        />
      )}
    />
  );
}
