import { FC, useMemo, useReducer, useCallback } from 'react';
import { CloseIcon, FilledArrowDown } from '@/assests/icons';
import Button from '@/components/shared/button';
import Dialog from '@/components/shared/dialog';
import TableComponent from '@/components/shared/table/Table';
import TextInput from '@/components/shared/form/TextInput';
import { IAction, State, SupplierColumn } from '@/utils/types/supplier';
import { useTranslate } from '@/contexts/AppContext';
import { SupplierDto } from '@/endpoints';
import { AxiosInstance } from '@/utils/AxiosInstance';

interface SearchProps {
  isDialogOpen: boolean;
  handleDialogClose: () => void;
  supplier: SupplierDto;
  setSupplier: (supplier: SupplierDto) => void;
  setIsDialogOpen: (open: boolean) => void;
}

const initialState: State = {
  formValues: {
    name: '',
    index: '',
    city: '',
  },
  filteredSuppliers: [],
  selectedSupplier: {
    id: 0,
    index: '',
    name: '',
    city: '',
  },
};

const reducer = (state: State, action: IAction): State => {
  switch (action.type) {
    case 'SET_FORM_VALUE':
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.name]: action.value,
        },
      };
    case 'SET_FILTERED_SUPPLIERS':
      return {
        ...state,
        filteredSuppliers: action.suppliers,
      };
    case 'SET_SELECTED_SUPPLIER':
      return {
        ...state,
        selectedSupplier: action.supplier,
      };
    case 'RESET_FORM':
      return {
        ...state,
        formValues: { name: '', index: '', city: '' },
        filteredSuppliers: [],
        selectedSupplier: {
          id: 0,
          index: '',
          name: '',
          city: '',
        },
      };
    default:
      return state;
  }
};

const SearchSupplier: FC<SearchProps> = ({
  isDialogOpen,
  handleDialogClose,
  setSupplier,
  setIsDialogOpen,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { translate } = useTranslate();
  const columns = useMemo<SupplierColumn[]>(
    () => [
      { header: 'Supplier Name', accessor: 'name' },
      { header: 'Supplier Index', accessor: 'index' },
      { header: 'City', accessor: 'city' },
    ],
    [],
  );

  const handleInputChange = useCallback((name: string, value: string) => {
    dispatch({ type: 'SET_FORM_VALUE', name, value });
  }, []);

  const handleSearch = useCallback(async () => {
    const { name, index, city } = state.formValues;

    if (!name && !index && !city) {
      return;
    }
    const response = await AxiosInstance.supplierSearch({
      name,
      index,
      city,
    });
    dispatch({
      type: 'SET_FILTERED_SUPPLIERS',
      suppliers: response.data.data,
    });
  }, [state.formValues]);

  const resetSearch = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
  }, []);

  const renderActions = useCallback(
    (id?: number) => (
      <div className="radio-container">
        <input
          value={id}
          name="selected-supplier"
          onChange={() => {
            const selected = state.filteredSuppliers.find(
              (supplier) => supplier.id === id,
            );
            dispatch({
              type: 'SET_SELECTED_SUPPLIER',
              supplier: selected || { id: 0, index: '', name: '', city: '' },
            });
          }}
          type="radio"
          className="radio-button"
          checked={
            state.selectedSupplier ===
            state.filteredSuppliers.find((supplier) => supplier.id === id)
          }
        />
      </div>
    ),
    [state.selectedSupplier, state.filteredSuppliers],
  );

  return (
    <Dialog isOpen={isDialogOpen} onClose={handleDialogClose}>
      <div className="dialog-header">
        <p>{translate('Search for suppliers')}</p>
        <Button
          icon={<img src={CloseIcon} width={20} height={20} alt="Close" />}
          onClick={handleDialogClose}
        />
      </div>
      <div className="search-container">
        <div className="search-criteria">
          <img src={FilledArrowDown} alt="Search Criteria" />
          <p>Search criteria</p>
        </div>
        <div className="search-inputs-container">
          <TextInput
            label="Supplier Name"
            name="name"
            value={state.formValues.name}
            onChangeValue={handleInputChange}
            aria-label="Supplier Name"
          />
          <TextInput
            label="Supplier Index"
            name="index"
            value={state.formValues.index}
            onChangeValue={handleInputChange}
            aria-label="Supplier Index"
          />
          <TextInput
            label="City"
            name="city"
            value={state.formValues.city}
            onChangeValue={handleInputChange}
            aria-label="City"
          />
        </div>
        <div className="search-action-buttons">
          <Button onClick={handleSearch} type="button" label="Search" />
          <Button onClick={resetSearch} type="reset" label="Reset" />
        </div>
      </div>
      <div className="search-container">
        <div className="search-criteria">
          <img src={FilledArrowDown} alt="Suppliers List" />
          <p>Suppliers List</p>
        </div>
        <div className="search-inputs-container">
          <TableComponent
            renderActions={renderActions}
            data={state.filteredSuppliers}
            columns={columns}
            className="search-table"
          />
        </div>
        <div className="search-action-buttons">
          <Button
            onClick={() => {
              setSupplier(state.selectedSupplier);
              setIsDialogOpen(false);
            }}
            disabled={!(state.selectedSupplier.id > 0)}
            type="submit"
            label="Select"
          />
          <Button
            type="reset"
            label="Cancel"
            onClick={() => {
              setSupplier({
                id: 0,
                name: '',
                city: '',
                index: '',
              });
              dispatch({ type: 'SET_FILTERED_SUPPLIERS', suppliers: [] });
              dispatch({
                type: 'SET_SELECTED_SUPPLIER',
                supplier: {
                  id: 0,
                  name: '',
                  city: '',
                  index: '',
                },
              });
            }}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default SearchSupplier;
