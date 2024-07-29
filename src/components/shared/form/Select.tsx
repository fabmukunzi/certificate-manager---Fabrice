import React, { FC, SelectHTMLAttributes } from 'react';
import './styles.css';
import SVGIcon from '../svg';
import ArrowDown from '../svg/arrow-down';
import { useTranslate } from '@/contexts/AppContext';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectBoxProps {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: string;
  onChangeValue: (name: string, value: string) => void;
}

const Select: FC<SelectHTMLAttributes<HTMLSelectElement> & SelectBoxProps> = ({
  label,
  name,
  options,
  value,
  onChangeValue,
  placeholder,
  ...props
}) => {
  const { translate } = useTranslate();
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
        {placeholder && <option value="">{translate(placeholder)}</option>}
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
