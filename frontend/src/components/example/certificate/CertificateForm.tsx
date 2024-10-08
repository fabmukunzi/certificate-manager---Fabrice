import Button from '@/components/shared/button';
import { FC, FormEvent, useEffect, useState } from 'react';
import './certificate.css';
import '../../shared/dialog/dialog.css';
import { useNavigate } from 'react-router-dom';
import routes from '@/utils/routes';
import Select from '@/components/shared/form/Select';
import FileUpload from '@/components/shared/form/FileUpload';
import { formatDateToYYYYMMDD } from '@/utils/functions/formatDate';
import SearchInput from '@/components/shared/form/SearchInput';
import DateInput from '@/components/shared/form/DateInput';
import SearchSupplier from '../../lookup/SupplierSearch';
import { useTranslate } from '@/contexts/AppContext';
import { CloseIcon, SearchIcon } from '@/assests/icons';
import UserLookup from '@/components/lookup/UserLookup';
import TableComponent, { Column } from '@/components/shared/table/Table';
import AddComment from './AddComment';
import {
  CertificateDto,
  CertificateType,
  SupplierDto,
  UserDto,
} from '@/endpoints';
import { AxiosInstance } from '@/utils/AxiosInstance';
import { FORM_MODE } from '@/utils/enums/formMode';
import { useToast } from '@/contexts/ToastContext';

const columns: Column<UserDto>[] = [
  {
    header: 'Name',
    render: (_, user1) => (
      <>
        {user1?.firstName}, {user1?.lastName} ({user1?.id})
      </>
    ),
  },
  { header: 'Department', accessor: 'department' },
  { header: 'Email', accessor: 'email' },
];

const CertificateForm: FC<{
  initialValues: CertificateDto;
  mode: FORM_MODE;
}> = ({ initialValues, mode }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUserLookup, setIsUserLookup] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [supplier, setSupplier] = useState<SupplierDto>(initialValues.supplier);
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
  useEffect(() => {
    setFormValues((prevValues) => {
      if (supplier) prevValues.supplier = supplier;
      return prevValues;
    });
  }, [supplier]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formValues.supplier || formValues.supplier.id === 0) {
      return showToast('error', '❌ Please select a supplier');
    }
    if (
      (!formValues?.pdfUrl && !initialValues.pdfUrl) ||
      formValues.pdfUrl === ''
    )
      return showToast('error', '❌ Please upload a PDF file');
    try {
      if (initialValues.id) {
        await AxiosInstance.updateCertificate(
          Number(formValues.id),
          formValues,
        );
        showToast('success', translate('✅ Certificate updated successfully'));
      } else {
        await AxiosInstance.createCertificate(formValues);
        showToast('success', translate('✅ Certificate added successfully'));
      }
      navigate(routes.certificates.url);
    } catch (error) {
      showToast(
        'error',
        translate(
          `Failed to ${initialValues.id ? 'update' : 'add'} certificate.`,
        ),
      );
    }
  };

  const handleDelete = async (id?: number) => {
    if (
      confirm(translate('Are you sure you want to delete this certificate?'))
    ) {
      try {
        if (id) await AxiosInstance.deleteCertificate(id);
        navigate(routes.certificates.url);
      } catch (error) {
        showToast('error', '❌ Failed to delete certificate.');
      }
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };
  const closeUserLookup = (isUpdated?: boolean, users?: UserDto[]) => {
    if (isUpdated && users) {
      setFormValues((prevValues) => ({
        ...prevValues,
        assignedUsers: users,
      }));
    }
    setIsUserLookup(false);
  };
  const { translate } = useTranslate();
  const handleRemoveUser = (id: number) => {
    if (confirm(translate('Are you sure you want to remove this user?'))) {
      try {
        const updatedUsers = formValues?.assignedUsers?.filter(
          (user: UserDto) => user.id !== id,
        );
        setFormValues((prevValues) => ({
          ...prevValues,
          assignedUsers: updatedUsers,
        }));
      } catch (error) {
        showToast('error', '❌ Error removing user:');
      }
    }
  };
  const renderActions = (id: number) => (
    <button
      className="remove-user-button"
      onClick={() => handleRemoveUser(id)}
      aria-label={translate('Remove user')}
      type="button"
    >
      <img src={CloseIcon} alt={translate('Remove')} width={15} height={15} />
    </button>
  );
  const certificateTypes = [
    {
      value: CertificateType.PERMISSION_OF_PRINTING,
      label: translate('Permission of Printing'),
    },
    {
      value: CertificateType.OHSAS_18001,
      label: translate('OHSAS 18001'),
    },
  ];
  return (
    <section>
      <SearchSupplier
        supplier={supplier || { id: 0, index: '', name: null, city: '' }}
        setSupplier={setSupplier}
        handleDialogClose={handleClose}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
      <UserLookup
        initialUsers={formValues?.assignedUsers}
        handleClose={closeUserLookup}
        isDialogOpen={isUserLookup}
      />
      <form id="form" className="certificate-form" onSubmit={handleSubmit}>
        <div className="certificate-info">
          <SearchInput
            required={initialValues.supplier.id === 0}
            min={3}
            label={translate('Supplier')}
            name="supplier"
            readOnly
            value={supplier?.name || initialValues.supplier.name}
            onSearch={() => {
              setIsDialogOpen(true);
            }}
            onClose={() => setSupplier(supplier)}
            onChangeValue={handleInputChange}
          />
          <Select
            required
            onChangeValue={handleInputChange}
            label={translate('Certificate type')}
            placeholder="Select your option"
            name="type"
            value={formValues?.type}
            options={certificateTypes}
          />
          <DateInput
            required
            label={translate('Valid from')}
            name="validFrom"
            placeholder={translate('Click to select date')}
            max={formatDateToYYYYMMDD(new Date(formValues?.validTo) as Date)}
            defaultValue={formatDateToYYYYMMDD(new Date(formValues?.validFrom))}
            onChangeValue={handleInputChange}
          />
          <DateInput
            required
            label={translate('Valid to')}
            name="validTo"
            placeholder={translate('Click to select date')}
            disabled={!formValues?.validFrom}
            value={formatDateToYYYYMMDD(new Date(formValues.validTo))}
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
            data={formValues?.assignedUsers}
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
                mode === FORM_MODE.CREATE
                  ? translate('Save')
                  : translate('Update')
              }
            />
            {mode === FORM_MODE.CREATE ? (
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
