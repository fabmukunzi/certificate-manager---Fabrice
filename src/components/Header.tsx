import { CloseIcon, MenuIcon } from '@/assests/icons';
import { FC } from 'react';
import Button from './Button';

type Props = {
  setIsSideBarOpen: (isOpen: boolean) => void;
  isSideBarOpen: boolean;
};
const Header: FC<Props> = ({ setIsSideBarOpen, isSideBarOpen }) => {
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

      <h1>DCCS Tuzla</h1>
    </header>
  );
};

export default Header;
