import { FC, useState } from 'react';
import '@/components/example/certificate/certificate.css';
import { CloseIcon, FilledArrowDown } from '@/assests/icons';
import Button from '@/components/shared/button';
import Dialog from '@/components/shared/dialog';
import TableComponent from '@/components/shared/table/Table';
import TextInput from '@/components/shared/form/TextInput';
import { useTranslate } from '@/contexts/AppContext';
import { initialUsers } from '@/utils/data/supplier';
import { IUser } from '@/utils/types/certificate';

interface SearchProps {
  isDialogOpen: boolean;
  assignedUsers: IUser[];
  handleClose: () => void;
  setAssignedUsers: (users: IUser[]) => void;
  setIsDialogOpen: (open: boolean) => void;
}

interface Column {
  header: string;
  accessor: keyof IUser;
}

const UserLookup: FC<SearchProps> = ({
  isDialogOpen,
  assignedUsers,
  handleClose,
  setAssignedUsers,
  setIsDialogOpen,
}) => {
  const { translate } = useTranslate();
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>(
    undefined,
  );
  const [formValues, setFormValues] = useState({
    name: '',
    firstname: '',
    id: '',
    department: '',
    plant: '',
  });

  const columns: Column[] = [
    { header: translate('Name'), accessor: 'name' },
    { header: translate('First Name'), accessor: 'firstname' },
    { header: translate('User ID'), accessor: 'id' },
    { header: translate('Department'), accessor: 'department' },
    { header: translate('Plant'), accessor: 'plant' },
  ];

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const filtered = initialUsers.filter((user) => {
      return (
        user.name.toLowerCase().includes(formValues.name.toLowerCase()) &&
        user.firstname
          .toLowerCase()
          .includes(formValues.firstname.toLowerCase()) &&
        user.id.toString().includes(formValues.id.toString()) &&
        user.department
          .toLowerCase()
          .includes(formValues.department.toLowerCase()) &&
        user.plant.toLowerCase().includes(formValues.plant.toLowerCase())
      );
    });
    setFilteredUsers(filtered);
  };

  const renderActions = (id?: number) => (
    <div className="radio-container">
      <input
        value={id}
        name="selected-user"
        onChange={() => {
          const selected = initialUsers.find((user) => user.id === id);
          setSelectedUser(selected);
        }}
        type="radio"
        className="radio-button"
        checked={selectedUser?.id === id}
      />
    </div>
  );

  return (
    <Dialog isOpen={isDialogOpen} onClose={handleClose}>
      <div className="dialog-header">
        <p>{translate('Search for Persons')}</p>
        <Button
          icon={<img src={CloseIcon} width={20} height={20} />}
          onClick={handleClose}
        />
      </div>
      <div className="search-container">
        <div className="search-criteria">
          <img src={FilledArrowDown} />
          <p>{translate('Search criteria')}</p>
        </div>
        <div className="search-inputs-container">
          <TextInput
            label={translate('Name')}
            name="name"
            value={formValues.name}
            onChangeValue={handleInputChange}
          />
          <TextInput
            label={translate('First Name')}
            name="firstname"
            value={formValues.firstname}
            onChangeValue={handleInputChange}
          />
          <TextInput
            label={translate('User ID')}
            name="id"
            value={formValues.id}
            onChangeValue={handleInputChange}
          />
          <TextInput
            label={translate('Department')}
            name="department"
            value={formValues.department}
            onChangeValue={handleInputChange}
          />
          <TextInput
            label={translate('Plant')}
            name="plant"
            value={formValues.plant}
            onChangeValue={handleInputChange}
          />
        </div>
        <div className="search-action-buttons">
          <Button
            onClick={handleSearch}
            type="button"
            label={translate('Search')}
          />
          <Button
            onClick={() => {
              setFilteredUsers(initialUsers);
              setFormValues({
                name: '',
                firstname: '',
                id: '',
                department: '',
                plant: '',
              });
              setSelectedUser(undefined);
            }}
            type="reset"
            label={translate('Reset')}
          />
        </div>
      </div>
      <div className="search-container">
        <div className="search-criteria">
          <img src={FilledArrowDown} />
          <p>{translate('Person List')}</p>
        </div>
        <div className="search-inputs-container">
          <TableComponent
            renderActions={renderActions}
            data={filteredUsers}
            columns={columns}
            className="search-table"
          />
        </div>
        <div className="search-action-buttons">
          <Button
            onClick={() => {
              if (selectedUser) {
                setAssignedUsers([...assignedUsers, selectedUser]);
              }
              setIsDialogOpen(false);
              setSelectedUser(undefined);
            }}
            disabled={!selectedUser}
            type="submit"
            label={translate('Select')}
          />
          <Button
            type="reset"
            label={translate('Cancel')}
            onClick={() => {
              setFilteredUsers(initialUsers);
              setSelectedUser(undefined);
            }}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default UserLookup;
