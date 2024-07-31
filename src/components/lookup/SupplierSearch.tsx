import { FC, useState } from 'react';
import '@/components/example/certificate/certificate.css';
import { CloseIcon, FilledArrowDown } from '@/assests/icons';
import Button from '@/components/shared/button';
import Dialog from '@/components/shared/dialog';
import TableComponent from '@/components/shared/table/Table';
import TextInput from '@/components/shared/form/TextInput';
import { initialSuppliers } from '@/utils/data/supplier';
import { useTranslate } from '@/contexts/AppContext';
import { ISupplier } from '@/utils/types/certificate';

interface SearchProps {
  isDialogOpen: boolean;
  handleClose: () => void;
  supplierName: string;
  setSupplierName: (name: string | undefined) => void;
  setIsDialogOpen: (open: boolean) => void;
}

interface Column {
  header: string;
  accessor: keyof ISupplier;
}

const SearchSupplier: FC<SearchProps> = ({
  isDialogOpen,
  handleClose,
  supplierName,
  setSupplierName,
  setIsDialogOpen,
}) => {
  const { translate } = useTranslate();
  const [filteredSuppliers, setFilteredSuppliers] =
    useState<ISupplier[]>(initialSuppliers);
  const [selectedSupplier, setSelectedSupplier] = useState<string | undefined>(
    undefined,
  );
  const [formValues, setFormValues] = useState({
    name: supplierName,
    id: '',
    city: '',
  });

  const columns: Column[] = [
    { header: translate('Supplier Name'), accessor: 'name' },
    { header: translate('Supplier Index'), accessor: 'id' },
    { header: translate('City'), accessor: 'city' },
  ];

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const filtered = initialSuppliers.filter((supplier) => {
      return (
        supplier.name
          .toLowerCase()
          .includes((formValues.name || '').toLowerCase()) &&
        supplier.id.toString().includes(formValues.id.toString()) &&
        supplier.city.toLowerCase().includes(formValues.city.toLowerCase())
      );
    });
    setFilteredSuppliers(filtered);
  };

  const renderActions = (id?: number) => (
    <div className="radio-container">
      <input
        value={id}
        name="selected-supplier"
        onChange={() => {
          const selected = initialSuppliers.find(
            (supplier) => supplier.id === id,
          );
          setSelectedSupplier(selected?.name);
        }}
        type="radio"
        className="radio-button"
      />
    </div>
  );

  return (
    <Dialog isOpen={isDialogOpen} onClose={handleClose}>
      <div className="dialog-header">
        <p>{translate('Search for suppliers')}</p>
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
            label={translate('Supplier Name')}
            name="name"
            value={formValues.name}
            onChangeValue={handleInputChange}
          />
          <TextInput
            label={translate('Supplier Index')}
            name="id"
            onChangeValue={handleInputChange}
          />
          <TextInput
            label={translate('City')}
            name="city"
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
              setSupplierName('');
              setFilteredSuppliers(initialSuppliers);
            }}
            type="reset"
            label={translate('Reset')}
          />
        </div>
      </div>
      <div className="search-container">
        <div className="search-criteria">
          <img src={FilledArrowDown} />
          <p>{translate('Suppliers List')}</p>
        </div>
        <div className="search-inputs-container">
          <TableComponent
            renderActions={renderActions}
            data={filteredSuppliers}
            columns={columns}
            className="search-table"
          />
        </div>
        <div className="search-action-buttons">
          <Button
            onClick={() => {
              setSupplierName(selectedSupplier);
              setIsDialogOpen(false);
            }}
            disabled={!selectedSupplier}
            type="submit"
            label={translate('Select')}
          />
          <Button
            type="reset"
            label={translate('Cancel')}
            onClick={() => {
              setSupplierName('');
              setFilteredSuppliers(initialSuppliers);
              setSelectedSupplier(undefined);
            }}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default SearchSupplier;
