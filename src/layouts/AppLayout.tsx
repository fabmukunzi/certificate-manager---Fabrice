import { FC } from 'react';
import Header from '@/components/header';
import SideBar from '@/components/sidebar';
import useWindowResizeAndDevice from '@/utils/hooks/useWindowResize';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, useSidebar } from '@/context/SidebarContext';

const AppLayoutComponent: FC = () => {
  const { isMobile } = useWindowResizeAndDevice();
  const { isSideBarOpen } = useSidebar();

  return (
    <div className="app-layout">
      <Header />
      <main className="flex">
        {(!isMobile || isSideBarOpen) && (
          <div className="sidebar-menu">
            <SideBar />
          </div>
        )}
        <div className="outlet">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const AppLayout: FC = () => (
  <SidebarProvider>
    <AppLayoutComponent />
  </SidebarProvider>
);

export default AppLayout;
