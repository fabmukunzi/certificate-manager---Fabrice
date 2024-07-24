import { CloseIcon, FilledArrowDown } from '@/assests/icons';
import Button from '@/components/shared/button';
import Dialog from '@/components/shared/dialog';
import TableComponent from '@/components/shared/table/Table';
import { FC, useEffect, useState } from 'react';
import { ISupplier } from '../example/certificate/CertificateForm';
import { initialSuppliers } from '@/utils/data/supplier';
import TextInput from '@/components/shared/form/TextInput';

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

const SupplierSearch: FC<SearchProps> = ({
  isDialogOpen,
  handleClose,
  supplierName,
  setSupplierName,
  setIsDialogOpen,
}) => {
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
    { header: 'Supplier Name', accessor: 'name' },
    { header: 'Supplier Index', accessor: 'id' },
    { header: 'City', accessor: 'city' },
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
          .includes((formValues?.name || supplierName || '').toLowerCase()) &&
        supplier.id.toString().includes(formValues.id.toString()) &&
        supplier.city.toLowerCase().includes(formValues.city.toLowerCase())
      );
    });
    setFilteredSuppliers(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [supplierName]);

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
        checked={
          selectedSupplier ===
          initialSuppliers.find((supplier) => supplier.id === id)?.name
        }
      />
    </div>
  );

  return (
    <Dialog isOpen={isDialogOpen} onClose={handleClose}>
      <div className="dialog-header">
        <p>Search for suppliers</p>
        <Button
          icon={<img src={CloseIcon} width={20} height={20} />}
          onClick={handleClose}
        />
      </div>
      <div className="search-container">
        <div className="search-criteria">
          <img src={FilledArrowDown} />
          <p>Search criteria</p>
        </div>
        <div className="search-inputs-container">
          <TextInput
            label="Supplier Name"
            name="name"
            defaultValue={supplierName}
            onChangeValue={handleInputChange}
          />
          <TextInput
            label="Supplier Index"
            name="id"
            onChangeValue={handleInputChange}
          />
          <TextInput
            label="City"
            name="city"
            onChangeValue={handleInputChange}
          />
        </div>
        <div className="search-action-buttons">
          <Button onClick={handleSearch} type="button" label="Search" />
          <Button
            onClick={() => {
              setSupplierName('');
              setFilteredSuppliers(initialSuppliers);
            }}
            type="reset"
            label="Reset"
          />
        </div>
      </div>
      <div className="search-container">
        <div className="search-criteria">
          <img src={FilledArrowDown} />
          <p>Suppliers List</p>
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
            label="Select"
          />
          <Button
            type="reset"
            label="Cancel"
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

export default SupplierSearch;
