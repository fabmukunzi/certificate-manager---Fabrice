import { CloseIcon, MenuIcon } from '@/assests/icons';
import { FC } from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import Button from '../shared/button';
import Select from '../shared/form/Select';
import { Language, useTranslate } from '@/contexts/AppContext';
// import { useUserContext } from '@/contexts/UserContext';
// import { initialUsers } from '@/utils/data/supplier';

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
  // const { currentUser, setCurrentUser } = useUserContext();

  // const handleChange = (_: string, value: string) => {
  //   const selectedUserId = Number(value);
  //   const selectedUser = initialUsers.find(
  //     (user) => user.id === selectedUserId,
  //   );
  //   if (selectedUser) {
  //     setCurrentUser(selectedUser);
  //   }
  // };

  // const userOptions = initialUsers.map((user) => ({
  //   value: user.id.toString(),
  //   label: `${user.firstname} ${user.name}`,
  // }));
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
        <div className="header-side-menu-item">
          <p>{translate('Language')}:</p>
          <Select
            label=""
            defaultValue={language}
            name="language"
            options={languages}
            onChangeValue={(_, value) => setLanguage(value as Language)}
          />
        </div>
        <div className="header-side-menu-item">
          <p>{translate('User')}:</p>
          {/* <Select
            label=""
            name="currentUser"
            options={userOptions}
            value={currentUser?.id.toString() || ''}
            onChangeValue={handleChange}
          /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
