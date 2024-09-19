import { ChangeEvent, FC, InputHTMLAttributes } from 'react';
import './styles.css';
import { CloseIcon, SearchIcon } from '@/assests/icons';

interface SearchInputProps {
  label: string;
  name: string;
  onSearch?: () => void;
  onClose?: () => void;
  onChangeValue: (name: string, value: string | Date) => void;
}

const SearchInput: FC<
  InputHTMLAttributes<HTMLInputElement> & SearchInputProps
> = ({ label, onSearch, onClose, onChangeValue, name, ...props }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeValue(name, e.target.value);
  };

  return (
    <div className="form-input">
      <label htmlFor={name}>{label}</label>
      <input
        {...props}
        type="search"
        onChange={handleChange}
        id={name}
        name={name}
      />
      <div className="search-input-icons">
        <img onClick={onSearch} src={SearchIcon} alt="search icon" />
        <img onClick={onClose} src={CloseIcon} alt="close icon" />
      </div>
    </div>
  );
};

export default SearchInput;