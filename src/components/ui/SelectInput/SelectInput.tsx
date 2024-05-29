'use client';

import { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';

import FieldWrapper from '../FieldWrapper';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  value: SelectOption;
  disabled?: boolean;
  name: string;

  defaultValue?: SelectOption;
  options: SelectOption[];
  isSearchable?: boolean;
  label: string;
  error?: string;
  className?: string;
}

export default function SelectInput({
  onChange,
  onBlur,
  value,
  disabled,
  name,
  defaultValue,
  options,
  isSearchable = false,
  label,
  error,
  className,
}: SelectInputProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const selectedOption = options.find(option => option.value === value.value);

  /**
   * HANDLERS
   */
  function handleChange(option: SingleValue<SelectOption>) {
    onChange(option?.value);
  }

  return (
    isMounted && (
      <FieldWrapper label={label} error={error}>
        <Select
          onBlur={onBlur}
          value={selectedOption}
          isDisabled={disabled}
          name={name}
          onChange={handleChange}
          defaultValue={defaultValue}
          options={options}
          isSearchable={isSearchable}
          placeholder={`Select ${label}`}
          className={className}
          styles={{
            singleValue: provided => ({
              ...provided,
              fontSize: '14px',
            }),
            option: provided => ({
              ...provided,
              fontSize: '14px',
            }),
            placeholder: provided => ({
              ...provided,
              fontSize: '14px',
            }),
          }}
        />
      </FieldWrapper>
    )
  );
}
