import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import StartPage from '@/pages/StartPage';
import NotFound from '@/pages/NotFound';
import routes from '@/utils/routes';
import Newcertificate from '@/pages/New-certificate';
import EditCertificate from '@/pages/Edit-certificate';
import CertificatesPage from '@/pages/Certificates';

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={routes.startPage.url} element={<StartPage />} />
        <Route path={routes.certificates.url} element={<CertificatesPage />} />
        <Route path={routes.newCertificate.url} element={<Newcertificate />} />
        <Route
          path={`${routes.certificates.url}/:certificateId`}
          element={<EditCertificate />}
        />
        <Route path="*" element={<NotFound />} /> {/* Not found page */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
