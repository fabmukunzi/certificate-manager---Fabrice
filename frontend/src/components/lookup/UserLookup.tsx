import { FC, useMemo, useReducer, useCallback } from 'react';
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
  handleClose: (isUpdated?: boolean, users?: IUser[]) => void;
}

interface Column {
  header: string;
  accessor: keyof IUser;
}

interface State {
  filteredUsers: IUser[];
  selectedUser: IUser | undefined;
  formValues: {
    name: string;
    firstname: string;
    id: string;
    department: string;
    plant: string;
  };
}

type Action =
  | { type: 'SET_FORM_VALUES'; name: string; value: string }
  | { type: 'SET_FILTERED_USERS'; users: IUser[] }
  | { type: 'SET_SELECTED_USER'; user: IUser | undefined }
  | { type: 'RESET_FORM' };

const initialState: State = {
  filteredUsers: initialUsers,
  selectedUser: undefined,
  formValues: {
    name: '',
    firstname: '',
    id: '',
    department: '',
    plant: '',
  },
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FORM_VALUES':
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.name]: action.value,
        },
      };
    case 'SET_FILTERED_USERS':
      return {
        ...state,
        filteredUsers: action.users,
      };
    case 'SET_SELECTED_USER':
      return {
        ...state,
        selectedUser: action.user,
      };
    case 'RESET_FORM':
      return {
        ...state,
        formValues: initialState.formValues,
        filteredUsers: initialUsers,
        selectedUser: undefined,
      };
    default:
      return state;
  }
};

const UserLookup: FC<SearchProps> = ({ isDialogOpen, handleClose }) => {
  const { translate } = useTranslate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const columns = useMemo<Column[]>(
    () => [
      { header: translate('Name'), accessor: 'name' },
      { header: translate('First Name'), accessor: 'firstname' },
      { header: translate('User ID'), accessor: 'id' },
      { header: translate('Department'), accessor: 'department' },
      { header: translate('Plant'), accessor: 'plant' },
    ],
    [translate],
  );

  const handleInputChange = useCallback((name: string, value: string) => {
    dispatch({ type: 'SET_FORM_VALUES', name, value });
  }, []);

  const handleSearch = useCallback(() => {
    const filtered = initialUsers.filter((user) => {
      return (
        user.name.toLowerCase().includes(state.formValues.name.toLowerCase()) &&
        user.firstname
          .toLowerCase()
          .includes(state.formValues.firstname.toLowerCase()) &&
        user.id.toString().includes(state.formValues.id.toString()) &&
        user.department
          .toLowerCase()
          .includes(state.formValues.department.toLowerCase()) &&
        user.plant.toLowerCase().includes(state.formValues.plant.toLowerCase())
      );
    });
    dispatch({ type: 'SET_FILTERED_USERS', users: filtered });
  }, [state.formValues]);

  const renderActions = useCallback(
    (id?: number) => (
      <div className="radio-container">
        <input
          value={id}
          name="selected-user"
          onChange={() => {
            const selected = initialUsers.find((user) => user.id === id);
            dispatch({ type: 'SET_SELECTED_USER', user: selected });
          }}
          type="radio"
          className="radio-button"
          checked={state.selectedUser?.id === id}
        />
      </div>
    ),
    [state.selectedUser],
  );

  return (
    <Dialog isOpen={isDialogOpen} onClose={handleClose}>
      <div className="dialog-header">
        <p>{translate('Search for Persons')}</p>
        <Button
          icon={<img src={CloseIcon} width={20} height={20} />}
          onClick={() => handleClose()}
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
            value={state.formValues.name}
            onChangeValue={handleInputChange}
          />
          <TextInput
            label={translate('First Name')}
            name="firstname"
            value={state.formValues.firstname}
            onChangeValue={handleInputChange}
          />
          <TextInput
            label={translate('User ID')}
            name="id"
            value={state.formValues.id}
            onChangeValue={handleInputChange}
          />
          <TextInput
            label={translate('Department')}
            name="department"
            value={state.formValues.department}
            onChangeValue={handleInputChange}
          />
          <TextInput
            label={translate('Plant')}
            name="plant"
            value={state.formValues.plant}
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
            onClick={() => dispatch({ type: 'RESET_FORM' })}
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
            data={state.filteredUsers}
            columns={columns}
            className="search-table"
          />
        </div>
        <div className="search-action-buttons">
          <Button
            onClick={() => {
              if (state.selectedUser) {
                handleClose(true, [state.selectedUser]);
              }
              handleClose();
              dispatch({ type: 'RESET_FORM' });
            }}
            disabled={!state.selectedUser}
            type="submit"
            label={translate('Select')}
          />
          <Button
            type="reset"
            label={translate('Cancel')}
            onClick={() => {
              dispatch({ type: 'RESET_FORM' });
              handleClose();
            }}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default UserLookup;
