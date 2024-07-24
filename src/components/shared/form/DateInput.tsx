import { ChangeEvent, FC, InputHTMLAttributes, useState } from 'react';
import './styles.css';

interface DateInputProps {
  label: string;
  name: string;
  onChangeValue: (name: string, value: string | Date) => void;
}

const DateInput: FC<InputHTMLAttributes<HTMLInputElement> & DateInputProps> = ({
  label,
  onChangeValue,
  name,
  ...props
}) => {
  const [inputType, setInputType] =
    useState<InputHTMLAttributes<HTMLInputElement>['type']>('text');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeValue(name, e.target.value);
  };

  return (
    <div className="form-input">
      <label htmlFor={name}>{label}</label>
      <input
        {...props}
        type={inputType}
        onChange={handleChange}
        onFocus={() => setInputType('date')}
        onBlur={() => setInputType('text')}
        id={name}
        name={name}
      />
    </div>
  );
};

export default DateInput;
