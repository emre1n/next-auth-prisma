'use client';

import Switch from '@/components/ui/Switch';
import { Controller, useFormContext } from 'react-hook-form';

interface FormFieldTextInputProps {
  label: string;
  fieldName: string;
  type?: string;
  disabled?: boolean;
}

export default function FormFieldTextInput({
  label,
  fieldName,
  disabled,
}: FormFieldTextInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <Switch field={field} label={label} disabled={disabled} />
      )}
    />
  );
}
