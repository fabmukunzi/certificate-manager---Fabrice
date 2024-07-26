import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import StartPage from '@/pages/StartPage';
import Example1 from '@/pages/Example1';
import Example2 from '@/pages/Example2';
import NotFound from '@/pages/NotFound';
import Example3 from '@/pages/Example3';
import routes from '@/utils/routes';
import Newcertificate from '@/pages/New-certificate';

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={routes.startPage.url} element={<StartPage />} />
        <Route path={routes.example1.url} element={<Example1 />} />
        <Route path={routes.example2.url} element={<Example2 />} />
        <Route path={routes.example3.url} element={<Example3 />} />
        <Route path={routes.newCertificate.url} element={<Newcertificate />} />
        <Route path="*" element={<NotFound />} /> {/* Not found page */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
