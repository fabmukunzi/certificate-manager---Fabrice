import { FC, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';
import { connectDB } from './database/certificate.controller';
const App: FC = () => {
  connectDB();
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
