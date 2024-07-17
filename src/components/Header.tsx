import { CloseIcon, MenuIcon } from '@/utils/constants/icons';
import React, { FC } from 'react';

type Props = {
  setIsSideBarOpen: (isOpen: boolean) => void;
  isSideBarOpen: boolean;
};
const Header: FC<Props> = ({ setIsSideBarOpen, isSideBarOpen }) => {
  return (
    <div className="header">
      <img
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        width={30}
        height={30}
        className="header-menu-icon"
        src={isSideBarOpen ? CloseIcon : MenuIcon}
      />
      <h1>DCCS Tuzla</h1>
    </div>
  );
};

export default Header;
