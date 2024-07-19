import '@/styles/sidebar.css';
import { SIDEBAR_ITEMS } from '@/utils/constants/sidebar';
import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SubMenu from './SubMenu';
import SidebarItem from './SidebarItem';

type Props = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (isOpen: boolean) => void;
};
const SideBar: FC<Props> = ({ setIsSideBarOpen }) => {
  const route = useLocation();
  const [activeRoute, setActiveRoute] = useState<string>(
    route?.pathname?.split('/')[1] || SIDEBAR_ITEMS[0]?.name,
  );
  const [isSubMenuCollapsed, setIsSubMenuCollapsed] = useState(false);
  return (
    <nav className="sidebar">
      {SIDEBAR_ITEMS?.map((item) => (
        <div key={item.id} className="side-bar-item">
          <SidebarItem
            setActiveRoute={setActiveRoute}
            activeRoute={activeRoute}
            item={item}
            setIsSideBarOpen={setIsSideBarOpen}
            setIsSubMenuCollapsed={setIsSubMenuCollapsed}
            isSubMenuCollapsed={isSubMenuCollapsed}
          />
          {!isSubMenuCollapsed && (
            <SubMenu
              activeRoute={activeRoute}
              setIsSideBarOpen={setIsSideBarOpen}
              setActiveRoute={setActiveRoute}
              item={item}
            />
          )}
        </div>
      ))}
    </nav>
  );
};

export default SideBar;
