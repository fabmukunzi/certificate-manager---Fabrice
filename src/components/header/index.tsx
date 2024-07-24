import { CloseIcon, MenuIcon } from '@/assests/icons';
import { FC } from 'react';
import { useSidebar } from '@/context/SidebarContext';
import Button from '../shared/button';

const Header: FC = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useSidebar();
  const toggleMenu = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  return (
    <header className="header">
      <Button
        aria-label="Menu Icon"
        aria-expanded={isSideBarOpen}
        onClick={toggleMenu}
        className="header-menu-icon"
        icon={
          <img
            alt={isSideBarOpen ? 'Close Icon' : 'Menu Icon'}
            src={isSideBarOpen ? CloseIcon : MenuIcon}
          />
        }
      />
      <div className="header-title">
        <h1>DCCS Tuzla</h1>
      </div>
    </header>
  );
};

export default Header;
