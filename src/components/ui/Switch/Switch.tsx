import React, { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import ReactSwitch from 'react-switch';

interface SwitchProps {
  label: string;
  field: ControllerRenderProps;
  disabled?: boolean;
  onChange?: (isChecked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({
  label,
  disabled,
  onChange,
  field,
}) => {
  const [checked, setChecked] = useState(false);

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
        onColor="#86d3ff"
        onHandleColor="#2693e6"
        handleDiameter={18}
        uncheckedIcon={false}
        checkedIcon={false}
        // boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        // activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={36}
        className="react-switch"
      />
      <label className="text-sm">{label}</label>
    </div>
  );
};

export default Switch;
