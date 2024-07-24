import Button from '@/components/shared/button';
import {
  addCertificate,
  deleteCertificate,
  updateCertificate,
} from '@/database/certificate.controller';
import { FC, FormEvent, useEffect, useState } from 'react';
import './certificate.css';
import '../../shared/dialog/dialog.css';
import { useNavigate } from 'react-router-dom';
import routes from '@/utils/routes';
import Select from '@/components/shared/form/Select';
import FileUpload from '@/components/shared/form/FileUpload';
import { ICertificate } from '@/utils/types/certificate';
import { certificateTypes } from '@/utils/data/certificates';
import { formatDateToYYYYMMDD } from '@/utils/functions/formatDate';
import SearchInput from '@/components/shared/form/SearchInput';
import DateInput from '@/components/shared/form/DateInput';
import SearchCertificate from '../../lookup/SupplierSearch';
import { useTranslate } from '@/contexts/AppContext';

export interface ISupplier {
  id: number;
  name: string;
  city: string;
}
const CertificateForm: FC<{ initialValues: ICertificate }> = ({
  initialValues,
}) => {
  const navigate = useNavigate();
  const todayDate = formatDateToYYYYMMDD(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [supplierName, setSupplierName] = useState<string | undefined>(
    undefined,
  );

  const [formValues, setFormValues] = useState<ICertificate>(initialValues);
  const handleInputChange = (name: string, value: string | Date) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const areInitialValuesEmpty = Object.values(initialValues || {}).every(
    (value) => value === '' || value === null,
  );
  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      supplier: supplierName || '',
    }));
  }, [supplierName]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formValues?.pdfUrl && !initialValues.pdfUrl)
      return alert(translate('Please upload a PDF file'));
    try {
      if (initialValues.id) {
        await updateCertificate(Number(formValues.id), formValues);
        alert(translate('Certificate updated successfully'));
      } else {
        await addCertificate(formValues);
        alert(translate('Certificate added successfully'));
      }
      navigate(routes.certificates.url);
    } catch (error) {
      alert(
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
  const { translate } = useTranslate();

  return (
    <section style={{ marginTop: '50px' }}>
      <SearchCertificate
        supplierName={supplierName || ''}
        setSupplierName={setSupplierName}
        handleDialogClose={handleClose}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
      <form id="form" className="certificate-form" onSubmit={handleSubmit}>
        <div className="certificate-info">
          <SearchInput
            required
            min={3}
            label={translate('Supplier')}
            name="supplier"
            readOnly
            value={formValues.supplier}
            onSearch={() => {
              setIsDialogOpen(true);
            }}
            onClose={() => setSupplierName('')}
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
            defaultValue={formValues?.validFrom}
            onChangeValue={handleInputChange}
          />
          <DateInput
            required
            label={translate('Valid to')}
            name="validTo"
            placeholder={translate('Click to select date')}
            disabled={!formValues?.validFrom}
            defaultValue={formValues?.validTo}
            min={formatDateToYYYYMMDD(new Date(formValues?.validFrom) as Date)}
            onChangeValue={handleInputChange}
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
