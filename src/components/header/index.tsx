import { CloseIcon, MenuIcon } from '@/assests/icons';
import { FC } from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import Button from '../shared/button';
import Select from '../shared/form/Select';
import { Language, useTranslate } from '@/contexts/AppContext';

const Header: FC = () => {
  const languages = [
    { label: 'English', value: 'en' },
    { label: 'German', value: 'de' },
  ];
  const { isSideBarOpen, setIsSideBarOpen } = useSidebar();
  const { language, setLanguage, translate } = useTranslate();
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
      <div className="header-side-menu">
        <p>{translate('Language')}:</p>
        <Select
          label=""
          defaultValue={language}
          name="language"
          options={languages}
          onChangeValue={(_, value) => setLanguage(value as Language)}
        />
      </div>
    </header>
  );
};

export default Header;
