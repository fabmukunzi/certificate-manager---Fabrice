import Toast from '@/components/shared/toast';
import { createContext, useContext, useState, FC, ReactNode } from 'react';

interface ToastContextType {
  showToast: (
    type: 'success' | 'error' | 'info',
    message: string,
    timer?: number,
  ) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastContext');
  }
  return context;
};

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toastData, setToastData] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
    timer?: number;
  } | null>(null);

  const showToast = (
    type: 'success' | 'error' | 'info',
    message: string,
    timer?: number,
  ) => {
    setToastData({ type, message, timer });
  };

  const hideToast = () => {
    setToastData(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toastData && (
        <Toast
          type={toastData.type}
          message={toastData.message}
          onClose={hideToast}
          timer={toastData.timer}
        />
      )}
    </ToastContext.Provider>
  );
};
