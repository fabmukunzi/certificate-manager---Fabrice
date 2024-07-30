import { FC, useMemo, useEffect, useReducer, useCallback } from 'react';
import { CloseIcon, FilledArrowDown } from '@/assests/icons';
import Button from '@/components/shared/button';
import Dialog from '@/components/shared/dialog';
import TableComponent from '@/components/shared/table/Table';
import TextInput from '@/components/shared/form/TextInput';
import { IAction, State, SupplierColumn } from '@/utils/types/supplier';
import { initialSuppliers } from '@/utils/data/supplier';
import { useTranslate } from '@/contexts/AppContext';

interface SearchProps {
  isDialogOpen: boolean;
  handleDialogClose: () => void;
  supplierName: string;
  setSupplierName: (name: string | undefined) => void;
  setIsDialogOpen: (open: boolean) => void;
}

const initialState: State = {
  formValues: {
    name: '',
    id: '',
    city: '',
  },
  filteredSuppliers: initialSuppliers,
  selectedSupplier: undefined,
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
        formValues: { name: '', id: '', city: '' },
        filteredSuppliers: initialSuppliers,
        selectedSupplier: undefined,
      };
    default:
      return state;
  }
};

const SearchSupplier: FC<SearchProps> = ({
  isDialogOpen,
  handleDialogClose,
  supplierName,
  setSupplierName,
  setIsDialogOpen,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { translate } = useTranslate();
  const columns = useMemo<SupplierColumn[]>(
    () => [
      { header: 'Supplier Name', accessor: 'name' },
      { header: 'Supplier Index', accessor: 'id' },
      { header: 'City', accessor: 'city' },
    ],
    [],
  );

  const handleInputChange = useCallback((name: string, value: string) => {
    dispatch({ type: 'SET_FORM_VALUE', name, value });
  }, []);

  const handleSearch = useCallback(() => {
    const filtered = initialSuppliers.filter((supplier) => {
      return (
        supplier.name
          .toLowerCase()
          .includes((state.formValues.name || supplierName).toLowerCase()) &&
        supplier.id.toString().includes(state.formValues.id) &&
        supplier.city
          .toLowerCase()
          .includes(state.formValues.city.toLowerCase())
      );
    });
    dispatch({ type: 'SET_FILTERED_SUPPLIERS', suppliers: filtered });
  }, [state.formValues, supplierName]);

  useEffect(() => {
    handleSearch();
  }, [supplierName, handleSearch]);

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
            const selected = initialSuppliers.find(
              (supplier) => supplier.id === id,
            );
            dispatch({
              type: 'SET_SELECTED_SUPPLIER',
              supplier: selected?.name,
            });
          }}
          type="radio"
          className="radio-button"
          checked={
            state.selectedSupplier ===
            initialSuppliers.find((supplier) => supplier.id === id)?.name
          }
        />
      </div>
    ),
    [state.selectedSupplier],
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
            label={translate('Supplier Name')}
            name="name"
            value={state.formValues.name}
            onChangeValue={handleInputChange}
            aria-label="Supplier Name"
          />
          <TextInput
            label={translate('Supplier Index')}
            name="id"
            value={state.formValues.id}
            onChangeValue={handleInputChange}
            aria-label="Supplier Index"
          />
          <TextInput
            label={translate('City')}
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
              setSupplierName(state.selectedSupplier);
              setIsDialogOpen(false);
            }}
            disabled={!state.selectedSupplier}
            type="submit"
            label={translate('Select')}
          />
          <Button
            type="reset"
            label={translate('Cancel')}
            onClick={() => {
              setSupplierName('');
              dispatch({
                type: 'SET_FILTERED_SUPPLIERS',
                suppliers: initialSuppliers,
              });
              dispatch({ type: 'SET_SELECTED_SUPPLIER', supplier: undefined });
            }}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default SearchSupplier;
