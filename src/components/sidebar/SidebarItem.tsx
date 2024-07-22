import { ArrowDownIcon, ArrowUpIcon } from '@/assests/icons';
import { SIDEBAR_PROPS, SidebarItemProps } from '@/utils/types/sidebar';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const SidebarItem: FC<SidebarItemProps> = ({
  activeRoute,
  setActiveRoute,
  item,
  setIsSubMenuCollapsed,
  setIsSideBarOpen,
  isSubMenuCollapsed,
}) => {
  const navigate = useNavigate();
  const handleItemClick = (item: SIDEBAR_PROPS) => {
    setIsSideBarOpen(false);
    navigate(item.url ?? item.subItems?.[0]?.url ?? '#');
    setActiveRoute(item.name);
  };
  return (
    <div
      onClick={() => handleItemClick(item)}
      className={`${
        activeRoute === item.name ||
        (item.subItems &&
          item.subItems.some((subItem) => subItem.url === '/' + activeRoute))
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
        <div className="sub-menu-item-dropdown">
          <img
            onClick={() => setIsSubMenuCollapsed(!isSubMenuCollapsed)}
            src={isSubMenuCollapsed ? ArrowDownIcon : ArrowUpIcon}
            alt={item.name}
          />
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
