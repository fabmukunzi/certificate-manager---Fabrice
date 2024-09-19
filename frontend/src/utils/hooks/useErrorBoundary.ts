import { useState, useCallback } from 'react';

const useErrorBoundary = () => {
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const resetError = useCallback(() => {
    setHasError(false);
    location.reload();
  }, []);

  return { hasError, handleError, resetError };
};

export default useErrorBoundary;
