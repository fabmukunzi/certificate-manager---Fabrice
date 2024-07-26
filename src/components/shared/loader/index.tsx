import { FC } from 'react';
import './styles.css';

const Loader: FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default Loader;
