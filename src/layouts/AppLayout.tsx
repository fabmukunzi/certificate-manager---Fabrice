import Header from '@/components/Header';
import SideBar from '@/components/sidebar';
import useWindowResize from '@/utils/hooks/useWindowResize';
import React, { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout: FC = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { isMobile } = useWindowResize();

  return (
    <div>
      <Header
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <div className="flex">
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
      </div>
    </div>
  );
};

export default AppLayout;
