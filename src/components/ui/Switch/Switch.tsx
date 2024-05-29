import React, { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import ReactSwitch from 'react-switch';
import resolveConfig from 'tailwindcss/resolveConfig';
import type { DefaultColors } from 'tailwindcss/types/generated/colors';

import tailwindConfig from '../../../../tailwind.config';

type ExtendedColors = DefaultColors & {
  primary: string;
  secondary: string;
};

interface SwitchProps {
  label: string;
  field: ControllerRenderProps;
  disabled?: boolean;
  onChange?: (isChecked: boolean) => void;
  defaultValue?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  label,
  disabled,
  onChange,
  field,
  defaultValue = false,
}) => {
  const [checked, setChecked] = useState(defaultValue);

  const fullConfig = resolveConfig(tailwindConfig);
  const colors = fullConfig.theme.colors as ExtendedColors;
  const primaryColor = colors.primary;
  const secondaryColor = colors.secondary;

  const handleChange = (isChecked: boolean) => {
    setChecked(isChecked);
    if (onChange) {
      onChange(isChecked);
    }
    field.onChange(isChecked);
  };

  return (
    <div className="flex items-center space-x-2">
      <ReactSwitch
        {...field}
        disabled={disabled}
        checked={checked}
        onChange={handleChange}
        onColor={primaryColor}
        onHandleColor={secondaryColor}
        handleDiameter={18}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
        height={20}
        width={36}
        className="react-switch"
      />
      <label className="text-sm">{label}</label>
    </div>
  );
};

export default Switch;
