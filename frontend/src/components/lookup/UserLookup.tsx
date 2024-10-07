import { FC, useMemo, useReducer, useCallback, useEffect } from 'react';
import '@/components/example/certificate/certificate.css';
import { CloseIcon, FilledArrowDown } from '@/assests/icons';
import Button from '@/components/shared/button';
import Dialog from '@/components/shared/dialog';
import TableComponent from '@/components/shared/table/Table';
import TextInput from '@/components/shared/form/TextInput';
import { useTranslate } from '@/contexts/AppContext';
import { UserDto } from '@/endpoints';
import { AxiosInstance } from '@/utils/AxiosInstance';

interface SearchProps {
  isDialogOpen: boolean;
  handleClose: (isUpdated?: boolean, users?: UserDto[]) => void;
  initialUsers: UserDto[];
}

interface Column {
  header: string;
  accessor: keyof UserDto;
}

interface State {
  filteredUsers: UserDto[];
  selectedUsers: UserDto[];
  formValues: {
    name: string;
    firstName: string;
    userId: string;
    department: string;
    plant: string;
  };
}

type Action =
  | { type: 'SET_FORM_VALUES'; name: string; value: string }
  | { type: 'SET_FILTERED_USERS'; users: UserDto[] }
  | { type: 'SET_SELECTED_USERS'; users: UserDto[] }
  | { type: 'TOGGLE_SELECTED_USER'; user: UserDto }
  | { type: 'RESET_FORM' };

const initialState: State = {
  filteredUsers: [],
  selectedUsers: [],
  formValues: {
    name: '',
    firstName: '',
    userId: '',
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
    case 'SET_SELECTED_USERS': {
      const updatedUsers = action.users.reduce(
        (acc, newUser) => {
          const isAlreadySelected = state.selectedUsers.some(
            (user) => user.id === newUser.id,
          );
          return isAlreadySelected ? acc : [...acc, newUser];
        },
        [...state.selectedUsers],
      ); // Start with the existing selected users
      return { ...state, selectedUsers: updatedUsers };
    }
    case 'TOGGLE_SELECTED_USER': {
      const isSelected = state.selectedUsers.some(
        (u) => u.id === action.user.id,
      );
      const selectedUsers = isSelected
        ? state.selectedUsers.filter((u) => u.id !== action.user.id)
        : [...state.selectedUsers, action.user];
      return { ...state, selectedUsers };
    }
    case 'RESET_FORM':
      return {
        ...state,
        formValues: initialState.formValues,
        filteredUsers: [],
        selectedUsers: [],
      };
    default:
      return state;
  }
};

const UserLookup: FC<SearchProps> = ({
  isDialogOpen,
  handleClose,
  initialUsers,
}) => {
  const { translate } = useTranslate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const columns = useMemo<Column[]>(
    () => [
      { header: translate('Last Name'), accessor: 'lastName' },
      { header: translate('First Name'), accessor: 'firstName' },
      { header: translate('User ID'), accessor: 'userId' },
      { header: translate('Department'), accessor: 'department' },
      { header: translate('Plant'), accessor: 'plant' },
    ],
    [translate],
  );

  const handleInputChange = useCallback((name: string, value: string) => {
    dispatch({ type: 'SET_FORM_VALUES', name, value });
  }, []);

  const handleSearch = useCallback(async () => {
    const { firstName, name, userId, department, plant } = state.formValues;
    if (!firstName && !name && !userId && !department && !plant) {
      return;
    }
    const users = await AxiosInstance.searchUsers({
      firstName,
      lastName: name,
      userId,
      department,
      plant,
    });
    dispatch({ type: 'SET_FILTERED_USERS', users: users.data.data });
  }, [state.formValues]);
  useEffect(() => {
    if (initialUsers.length > 0) {
      dispatch({ type: 'SET_FILTERED_USERS', users: initialUsers });
      dispatch({ type: 'SET_SELECTED_USERS', users: initialUsers });
    }
  }, [initialUsers]);
  const renderActions = useCallback(
    (id?: number) => (
      <div className="radio-container">
        <input
          type="checkbox"
          checked={!!state.selectedUsers.find((user) => user.id === id)}
          onChange={() => {
            const selectedUser = state.filteredUsers.find(
              (user) => user.id === id,
            );
            if (selectedUser) {
              dispatch({ type: 'TOGGLE_SELECTED_USER', user: selectedUser });
            }
          }}
        />
      </div>
    ),
    [state.selectedUsers, state.filteredUsers],
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
            label={translate('Last Name')}
            name="name"
            value={state.formValues.name}
            onChangeValue={handleInputChange}
          />
          <TextInput
            label={translate('First Name')}
            name="firstName"
            value={state.formValues.firstName}
            onChangeValue={handleInputChange}
          />
          <TextInput
            label={translate('User ID')}
            name="userId"
            value={state.formValues.userId}
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
              if (state.selectedUsers.length > 0) {
                handleClose(true, state.selectedUsers);
              } else {
                handleClose();
              }
              dispatch({ type: 'RESET_FORM' });
            }}
            disabled={state.selectedUsers.length === 0}
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
