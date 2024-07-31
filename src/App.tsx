import { FC, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';
import useDatabase from './utils/hooks/useDatabase';
import Loader from './components/shared/loader';
import ErrorComponent from './components/shared/error';
import { AppProvider } from './contexts/AppContext';
import { UserProvider } from './contexts/UserContext';
const App: FC = () => {
  const { isLoading, error } = useDatabase();
  if (isLoading) {
    return <Loader message="Connecting to database" />;
  }
  if (error) {
    return <ErrorComponent message={error || 'Something went wrong'} />;
  }
  return (
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <AppProvider>
            <UserProvider>
              <AppRoutes />
            </UserProvider>
          </AppProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
};

export default App;
