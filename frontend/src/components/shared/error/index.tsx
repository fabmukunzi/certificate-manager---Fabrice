import { FC } from 'react';
import './styles.css';

interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ message }) => {
  return (
    <div className="error-container">
      <p className="error-message">{message}</p>
    </div>
  );
};

export default ErrorComponent;
