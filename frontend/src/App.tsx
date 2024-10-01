import { FC, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';
import { AppProvider } from './contexts/AppContext';
import { UserProvider } from './contexts/UserContext';
const App: FC = () => {
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
