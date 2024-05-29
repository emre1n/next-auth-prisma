'use client';

import SelectInput from '@/components/ui/SelectInput';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  fieldName: string;
  options: SelectOption[];
  isSearchable?: boolean;
  defaultValue?: SelectOption;
}

export default function FormFieldSelectInput({
  fieldName,
  options,
  label,
  isSearchable = false,
  defaultValue,
}: SelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[fieldName];

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={{ required: true }}
      render={({ field }) => {
        const { onChange, name, onBlur, value, disabled } = field;
        return (
          <SelectInput
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            disabled={disabled}
            name={name}
            options={options}
            isSearchable={isSearchable}
            defaultValue={defaultValue}
            label={label}
            error={error?.message?.toString()}
          />
        );
      }}
    />
  );
}
