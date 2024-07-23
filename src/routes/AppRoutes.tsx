import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import StartPage from '@/pages/StartPage';
import Example from '@/pages/Example';
import Example1 from '@/pages/Example1';
import Example2 from '@/pages/Example2';
import NotFound from '@/pages/NotFound';

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<StartPage />} /> {/* Home page */}
        <Route path="/example" element={<Example />} />
        <Route path="/example1" element={<Example1 />} />
        <Route path="/example2" element={<Example2 />} />
        <Route path="*" element={<NotFound />} /> {/* Not found page */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
