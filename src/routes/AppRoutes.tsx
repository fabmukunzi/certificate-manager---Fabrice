import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';

// Lazy load components
const Example = lazy(() => import('@/pages/Example'));
const Example1 = lazy(() => import('@/pages/Example1'));
const Example2 = lazy(() => import('@/pages/Example2'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const StartPage = lazy(() => import('@/pages/StartPage'));

const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<StartPage />} /> {/* Home page */}
          <Route path="/example" element={<Example />} />
          <Route path="/example1" element={<Example1 />} />
          <Route path="/example2" element={<Example2 />} />
          <Route path="*" element={<NotFound />} /> {/* Not found page */}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
