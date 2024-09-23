import { connectDB } from '@/database/certificate.controller';
import { useState, useEffect } from 'react';

const useDatabase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeDB = async () => {
      try {
        await connectDB();
        setIsLoading(false);
      } catch (error) {
        setError('Failed to connect to the database. Please try again later.');
        setIsLoading(false);
      }
    };

    initializeDB();
  }, []);

  return { isLoading, error };
};

export default useDatabase;
