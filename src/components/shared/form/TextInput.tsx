import { ChangeEvent, FC, InputHTMLAttributes } from 'react';
import './styles.css';

interface TextInputProps {
  label: string;
  name: string;
  onChangeValue: (name: string, value: string) => void;
}

const TextInput: FC<InputHTMLAttributes<HTMLInputElement> & TextInputProps> = ({
  label,
  onChangeValue,
  name,
  ...props
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeValue(name, e.target.value);
  };

  return (
    <div className="form-input">
      <label htmlFor={name}>{label}</label>
      <input
        {...props}
        type="text"
        onChange={handleChange}
        id={name}
        name={name}
      />
    </div>
  );
};

export default TextInput;
