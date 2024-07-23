import React, { FC, SelectHTMLAttributes } from 'react';
import './styles.css';
import SVGIcon from '../svg';
import ArrowDown from '../svg/arrow-down';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectBoxProps {
  label: string;
  name: string;
  options: SelectOption[];
  defaultValue?: string;
  onChangeValue: (name: string, value: string) => void;
}

const Select: FC<SelectHTMLAttributes<HTMLSelectElement> & SelectBoxProps> = ({
  label,
  name,
  options,
  value,
  onChangeValue,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeValue(name, e.target.value);
  };

  return (
    <div className="form-input">
      <label htmlFor={name}>{label}</label>
      <select
        {...props}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
      >
        <option value="">Select your option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <SVGIcon className="select-arrow-icon" Icon={ArrowDown} />
    </div>
  );
};

export default Select;
