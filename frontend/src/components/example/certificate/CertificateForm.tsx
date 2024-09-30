import Button from '@/components/shared/button';
import {
  // addCertificate,
  deleteCertificate,
  // updateCertificate,
} from '@/database/certificate.controller';
import { FC, useEffect, useState } from 'react';
import './certificate.css';
import '../../shared/dialog/dialog.css';
import { useNavigate } from 'react-router-dom';
import routes from '@/utils/routes';
import Select from '@/components/shared/form/Select';
import FileUpload from '@/components/shared/form/FileUpload';
import { certificateTypes } from '@/utils/data/certificates';
import { formatDateToYYYYMMDD } from '@/utils/functions/formatDate';
import SearchInput from '@/components/shared/form/SearchInput';
import DateInput from '@/components/shared/form/DateInput';
import SearchSupplier from '../../lookup/SupplierSearch';
import { useTranslate } from '@/contexts/AppContext';
import { CloseIcon, SearchIcon } from '@/assests/icons';
import UserLookup from '@/components/lookup/UserLookup';
import TableComponent from '@/components/shared/table/Table';
import { UserColumn } from '@/utils/types/user';
import AddComment from './AddComment';
import { CertificateDto, SupplierEntity, UserDto } from '@/utils/types';

const columns: UserColumn[] = [
  { header: 'Name', accessor: 'lastName' },
  { header: 'Department', accessor: 'department' },
  { header: 'Email', accessor: 'email' },
];

const CertificateForm: FC<{ initialValues: CertificateDto }> = ({
  initialValues,
}) => {
  const navigate = useNavigate();
  const todayDate = formatDateToYYYYMMDD(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUserLookup, setIsUserLookup] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [supplierName, setSupplierName] = useState<SupplierEntity>();
  const [formValues, setFormValues] = useState<CertificateDto>(initialValues);
  const handleInputChange = (name: string, value: string | Date) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);
  console.log(initialValues, '=====dhdhdh');
  const areInitialValuesEmpty = Object.values(initialValues || {}).every(
    (value) => {
      if (Array.isArray(value)) {
        return true;
      }
      return value === '' || value === null;
    },
  );
  useEffect(() => {
    setFormValues((prevValues) => {
      // const newValues = {
      //   ...prevValues,
      //   supplier: supplierName || {},
      //   certificateAssignedUsers: [],
      // };
      // if (
      //   newValues.supplier !== prevValues.supplier.name ||
      //   newValues.certificateAssignedUsers !==
      //     prevValues.certificateAssignedUsers
      // ) {
      //   return newValues;
      // }

      return prevValues;
    });
  }, [supplierName]);

  // const handleSubmit = async (event: FormEvent) => {
  //   event.preventDefault();
  //   if (!formValues?.pdfUrl && !initialValues.pdfUrl)
  //     return alert(translate('Please upload a PDF file'));
  //   try {
  //     if (initialValues.id) {
  //       await updateCertificate(Number(formValues.id), formValues);
  //       alert(translate('Certificate updated successfully'));
  //     } else {
  //       await addCertificate(formValues);
  //       alert(translate('Certificate added successfully'));
  //     }
  //     navigate(routes.certificates.url);
  //   } catch (error) {
  //     alert(
  //       translate(
  //         `Failed to ${initialValues.id ? 'update' : 'add'} certificate.`,
  //       ),
  //     );
  //   }
  // };

  const handleDelete = async (id?: number) => {
    if (
      confirm(translate('Are you sure you want to delete this certificate?'))
    ) {
      try {
        await deleteCertificate(id);
        navigate(routes.certificates.url);
      } catch (error) {
        console.error(translate('Failed to delete certificate:'), error);
        alert(translate('Failed to delete certificate.'));
      }
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };
  const closeUserLookup = (isUpdated?: boolean, users?: UserDto[]) => {
    if (isUpdated) {
      formValues.certificateAssignedUsers = users || [];
    }
    setIsUserLookup(false);
  };
  const { translate } = useTranslate();

  const handleRemoveUser = (id: number) => {
    if (confirm(translate('Are you sure you want to remove this user?'))) {
      try {
        const updatedUsers = formValues?.certificateAssignedUsers?.filter(
          (user: UserDto) => user.id !== id,
        );
        setFormValues((prevValues) => ({
          ...prevValues,
          assignedUsers: updatedUsers,
        }));
      } catch (error) {
        console.error('Error removing user:', error);
      }
    }
  };

  const renderActions = (id: number) => (
    <button
      className="remove-user-button"
      onClick={() => handleRemoveUser(id)}
      aria-label={translate('Remove user')}
    >
      <img src={CloseIcon} alt={translate('Remove')} width={15} height={15} />
    </button>
  );
  console.log(
    formatDateToYYYYMMDD(new Date(formValues?.validTo)),
    '=====valid to',
  );
  return (
    <section>
      <SearchSupplier
        supplierName={supplierName?.name || ''}
        setSupplierName={setSupplierName}
        handleDialogClose={handleClose}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
      <UserLookup handleClose={closeUserLookup} isDialogOpen={isUserLookup} />
      <form
        id="form"
        className="certificate-form"
        // onSubmit={handleSubmit}
      >
        <div className="certificate-info">
          <SearchInput
            required
            min={3}
            label={translate('Supplier')}
            name="supplier"
            readOnly
            value={formValues.supplier.name}
            onSearch={() => {
              setIsDialogOpen(true);
            }}
            onClose={() =>
              setSupplierName({
                id: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
                name: 'Vicky Luanda',
                city: 'Luanda',
                index: 'MD25HM',
              })
            }
            onChangeValue={handleInputChange}
          />
          <Select
            required
            onChangeValue={handleInputChange}
            label={translate('Certificate type')}
            placeholder="Select your option"
            name="certificateType"
            value={formValues?.certificateType}
            options={certificateTypes}
          />
          <DateInput
            required
            label={translate('Valid from')}
            name="validFrom"
            placeholder={translate('Click to select date')}
            min={todayDate}
            defaultValue={formatDateToYYYYMMDD(new Date(formValues?.validFrom))}
            onChangeValue={handleInputChange}
          />
          <DateInput
            required
            label={translate('Valid to')}
            name="validTo"
            placeholder={translate('Click to select date')}
            disabled={!formValues?.validFrom}
            value={formatDateToYYYYMMDD(new Date(formValues?.validTo))}
            min={formatDateToYYYYMMDD(new Date(formValues?.validFrom) as Date)}
            onChangeValue={handleInputChange}
          />
          <div className="form-input">
            <label htmlFor="">{translate('Assigned users')}</label>
            <Button
              type="button"
              className="add-participant-button"
              onClick={() => setIsUserLookup(true)}
              icon={<img width={20} height={20} src={SearchIcon} />}
              label={translate('Add Participant')}
            />
          </div>
          <TableComponent
            data={formValues.certificateAssignedUsers ?? []}
            columns={columns}
            renderActions={(id) => renderActions(id)}
            className="search-table"
          />
          <AddComment
            setIsCommentOpen={setIsCommentOpen}
            isCommentOpen={isCommentOpen}
            comments={formValues?.comments}
          />
        </div>
        <div className="certificate-file-container">
          <FileUpload
            name="pdfUrl"
            label={translate('Upload')}
            accept="application/pdf"
            onChangeValue={handleInputChange}
            previewUrl={formValues?.pdfUrl as string}
          />
          <div className="action-buttons">
            <Button
              type="submit"
              label={
                areInitialValuesEmpty ? translate('Save') : translate('Update')
              }
            />
            {areInitialValuesEmpty ? (
              <Button
                label={translate('Reset')}
                type="reset"
                onClick={() => setFormValues(initialValues)}
              />
            ) : (
              <Button
                label={translate('Delete')}
                type="button"
                className="delete-button"
                onClick={() => handleDelete(formValues?.id)}
              />
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default CertificateForm;
