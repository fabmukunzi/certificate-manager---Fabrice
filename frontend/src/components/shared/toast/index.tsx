import { FC, useEffect } from 'react';
import './toast.css';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
  timer?: number;
}

const Toast: FC<ToastProps> = ({ type, message, onClose, timer = 3000 }) => {
  useEffect(() => {
    const duration = setTimeout(onClose, timer);
    return () => clearTimeout(duration);
  }, [onClose, timer]);
  return (
    <div className={`toast-container ${type}`}>
      <div className="alert-box">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Toast;
