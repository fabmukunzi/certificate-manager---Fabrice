import { SIDEBAR_PROPS } from '@/utils/types/sidebar';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type SubMenuProps = {
  item: SIDEBAR_PROPS;
  setIsSideBarOpen: (open: boolean) => void;
  setActiveRoute: (open: string) => void;
  activeRoute: string;
};
const SubMenu: FC<SubMenuProps> = ({
  item,
  setIsSideBarOpen,
  setActiveRoute,
  activeRoute,
}) => {
  const route = useLocation();
  const navigate = useNavigate();
  const [activeSubRoute, setActiveSubRoute] = useState<string>(route?.pathname);
  useEffect(() => {
    setActiveSubRoute(route?.pathname);
  }, [route?.pathname]);
  return (
    <div>
      <ul className="sidebar-sub-menu">
        {item?.subItems?.map((subItem) => (
          <li
            onClick={() => {
              setActiveSubRoute(subItem.url);
              setActiveRoute(item.name);
              subItem?.url ? navigate(subItem.url) : null;
              setIsSideBarOpen(false);
            }}
            key={subItem.id}
            className={`${activeRoute === item.name && activeSubRoute === subItem.url ? 'filter-blue' : 'filter-dark-blue'} flex sub-menu-item`}
          >
            {subItem.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubMenu;
