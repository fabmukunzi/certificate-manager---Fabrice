import Header from '@/components/Header';
import SideBar from '@/components/sidebar';
import useWindowResizeAndDevice from '@/utils/hooks/useWindowResize';
import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout: FC = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { isMobile } = useWindowResizeAndDevice();

  return (
    <div className="app-layout">
      <Header
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <main className="flex">
        {(!isMobile || isSideBarOpen) && (
          <div className="sidebar-menu">
            <SideBar
              isSideBarOpen={isSideBarOpen}
              setIsSideBarOpen={setIsSideBarOpen}
            />
          </div>
        )}
        <div className="outlet">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
