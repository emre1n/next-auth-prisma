'use client';

import Textarea from '@/components/ui/Textarea';
import { Controller, useFormContext } from 'react-hook-form';

interface FormFieldTextareaProps {
  label: string;
  fieldName: string;
  type?: string;
  placeholder?: string;
}

export default function FormFieldTextarea({
  label,
  fieldName,
  placeholder,
}: FormFieldTextareaProps) {
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
        <Textarea
          field={field}
          label={label}
          errors={errors}
          placeholder={placeholder}
        />
      )}
    />
  );
}
