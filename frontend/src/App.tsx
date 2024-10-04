import { FC, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';
import { AppProvider } from './contexts/AppContext';
import { UserProvider } from './contexts/UserContext';
import { ToastProvider } from './contexts/ToastContext';
const App: FC = () => {
  return (
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <ToastProvider>
            <AppProvider>
              <UserProvider>
                <AppRoutes />
              </UserProvider>
            </AppProvider>
          </ToastProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
};

export default App;
