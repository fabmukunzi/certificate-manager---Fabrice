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
      return alert('Please upload a PDF file');
    try {
      if (initialValues.id) {
        await updateCertificate(Number(formValues.id), formValues);
        alert('Certificate updated successfully');
      } else {
        await addCertificate(formValues);
        alert('Certificate added successfully');
      }
      navigate(routes.certificates.url);
    } catch (error) {
      alert(`Failed to ${initialValues.id ? 'update' : 'add'} certificate.`);
    }
  };
  const handleDelete = async (id?: number) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      try {
        await deleteCertificate(id);
        navigate(routes.certificates.url);
      } catch (error) {
        alert('Failed to delete certificate.');
      }
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };
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
            label="Supplier"
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
            label="Certificate type"
            name="certificateType"
            value={formValues?.certificateType}
            options={certificateTypes}
          />
          <DateInput
            required
            label="Valid from"
            name="validFrom"
            placeholder="Click to select date"
            min={todayDate}
            defaultValue={formValues?.validFrom}
            onChangeValue={handleInputChange}
          />
          <DateInput
            required
            label="Valid to"
            name="validTo"
            placeholder="Click to select date"
            disabled={!formValues?.validFrom}
            defaultValue={formValues?.validTo}
            min={formatDateToYYYYMMDD(new Date(formValues?.validFrom) as Date)}
            onChangeValue={handleInputChange}
          />
        </div>
        <div className="certificate-file-container">
          <FileUpload
            name="pdfUrl"
            label="Upload"
            accept="application/pdf"
            onChangeValue={handleInputChange}
            previewUrl={formValues?.pdfUrl as string}
          />
          <div className="action-buttons">
            <Button
              type="submit"
              label={areInitialValuesEmpty ? 'Save' : 'Update'}
            />
            {areInitialValuesEmpty ? (
              <Button
                label="Reset"
                type="reset"
                onClick={() => setFormValues(initialValues)}
              />
            ) : (
              <Button
                label="Delete"
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
