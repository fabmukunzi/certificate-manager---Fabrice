import { ArrowDownIcon } from '@/assests/icons';
import { SIDEBAR_PROPS } from '@/utils/types/sidebar';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type SidebarItemProps = {
  item: SIDEBAR_PROPS;
  activeRoute: string;
  isSubMenuCollapsed: boolean;
  setActiveRoute: (open: string) => void;
  setIsSubMenuCollapsed: (open: boolean) => void;
  setIsSideBarOpen: (open: boolean) => void;
};
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
    if (item?.subItems) {
      setIsSubMenuCollapsed(!isSubMenuCollapsed);
    } else {
      setIsSideBarOpen(false);
      navigate(item.url || '#');
    }
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
        <div
          className={`sub-menu-item-dropdown ${isSubMenuCollapsed ? 'collapsed' : 'expanded'}`}
        >
          <img src={ArrowDownIcon} alt={item.name} />
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
