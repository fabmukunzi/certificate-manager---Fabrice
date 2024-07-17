import '@/styles/sidebar.css';
import { ArrowDownIcon } from '@/utils/constants/icons';
import { SIDEBAR_ITEMS } from '@/utils/constants/sidebar';
import { SIDEBAR_PROPS } from '@/utils/types/sidebar';
import React, { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (isOpen: boolean) => void;
};
const SideBar: FC<Props> = ({ setIsSideBarOpen }) => {
  const route = useLocation();
  const navigate = useNavigate();
  const [activeRoute, setActiveRoute] = useState<string>(
    route?.pathname?.split('/')[1] || SIDEBAR_ITEMS[0]?.name,
  );
  const [activeSubRoute, setActiveSubRoute] = useState<string>(route?.pathname);
  const [isSubMenuCollapsed, setIsSubMenuCollapsed] = useState(false);
  const handleItemClick = (item: SIDEBAR_PROPS) => {
    if (item?.subItems) {
      setIsSubMenuCollapsed(!isSubMenuCollapsed);
    } else {
      setIsSideBarOpen(false);
      navigate(item.url || '#');
    }
    setActiveRoute(item.name);
  };
  return (
    <div className="sidebar">
      {SIDEBAR_ITEMS?.map((item) => (
        <div key={item.id} className="side-bar-item">
          <div
            onClick={() => handleItemClick(item)}
            className={`${
              activeRoute === item.name ||
              (item.subItems &&
                item.subItems.some(
                  (subItem) => subItem.url === '/' + activeRoute,
                ))
                ? 'filter-blue'
                : 'filter-dark-blue'
            } flex menu-item`}
          >
            <div
              className="active-sidebar-item-indicator"
              style={{
                background:
                  activeRoute === item.name ||
                  (item.subItems &&
                    item.subItems.some(
                      (subItem) => subItem.url === '/' + activeRoute,
                    ))
                    ? ' '
                    : 'transparent',
              }}
            ></div>
            <img src={item.icon as string} alt={item.name} />
            <p>{item.name}</p>
            {(item?.subItems?.length || 0) > 0 && (
              <div
                className={`sub-menu-item-dropdown ${isSubMenuCollapsed ? 'collapsed' : 'expanded'}`}
              >
                <img src={ArrowDownIcon} alt={item.name} />
              </div>
            )}
          </div>
          {!isSubMenuCollapsed && (
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
                  className={`${activeSubRoute === subItem.url ? 'filter-blue' : 'filter-dark-blue'} flex sub-menu-item`}
                >
                  {subItem.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
