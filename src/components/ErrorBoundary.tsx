import { FC, ReactNode, useEffect } from 'react';
import Button from './Button';
import useErrorBoundary from '@/utils/hooks/useErrorBoundary';

type Props = {
  children: ReactNode;
};

const ErrorBoundary: FC<Props> = ({ children }) => {
  const { hasError, handleError, resetError } = useErrorBoundary();

  useEffect(() => {
    const handleWindowError = () => {
      handleError();
    };
    window.addEventListener('error', handleWindowError);
    return () => {
      window.removeEventListener('error', handleWindowError);
    };
  }, [handleError]);

  if (hasError) {
    return (
      <section className="try-again">
        <h2>Something Went Wrong</h2>
        <Button onClick={resetError} aria-label="Try again" label="Try again" />
      </section>
    );
  }
  return <>{children}</>;
};

export default ErrorBoundary;
