import { FC, StrictMode, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';
import { connectDB } from './database/certificate.controller';
const App: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeDB = async () => {
      try {
        await connectDB();
        setIsLoading(true);
      } catch (error) {
        console.error('Error initializing the database:', error);
      }
    };
    initializeDB();
  }, []);
  if (!isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
};

export default App;
