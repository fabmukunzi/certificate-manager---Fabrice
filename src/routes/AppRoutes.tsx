import AppLayout from '@/layouts/AppLayout';
import Example from '@/pages/Example';
import Example1 from '@/pages/Example1';
import Example2 from '@/pages/Example2';
import NotFound from '@/pages/NotFound';
import StartPage from '@/pages/StartPage';
import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<StartPage />} />
        <Route path="/example" element={<Example />} />
        <Route path="/example1" element={<Example1 />} />
        <Route path="/example2" element={<Example2 />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
