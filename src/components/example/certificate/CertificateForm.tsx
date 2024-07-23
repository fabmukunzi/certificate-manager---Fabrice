import Button from '@/components/shared/button';
import {
  addCertificate,
  updateCertificate,
} from '@/database/certificate.controller';
import { FC, FormEvent, useEffect, useState } from 'react';
import './certificate.css';
import { useNavigate } from 'react-router-dom';
import routes from '@/utils/routes';
import Select from '@/components/shared/form/Select';
import FileUpload from '@/components/shared/form/FileUpload';
import { ICertificate } from '@/utils/types/certificate';
import { certificateTypes } from '@/utils/data/certificates';
import { formatDateToYYYYMMDD } from '@/utils/functions/formatDate';
import SearchInput from '@/components/shared/form/SearchInput';
import DateInput from '@/components/shared/form/DateInput';

const CertificateForm: FC<{ initialValues: ICertificate }> = ({
  initialValues,
}) => {
  const navigate = useNavigate();
  const todayDate = formatDateToYYYYMMDD(new Date());
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
      navigate(routes.example1.url);
    } catch (error) {
      alert(`Failed to ${initialValues.id ? 'update' : 'add'} certificate.`);
    }
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <form id="form" className="certificate-form" onSubmit={handleSubmit}>
        <div className="certificate-info">
          <SearchInput
            required
            min={3}
            label="Supplier"
            name="supplier"
            defaultValue={initialValues.supplier}
            onChangeValue={handleInputChange}
          />
          <Select
            required
            onChangeValue={handleInputChange}
            label="Certificate type"
            name="certificateType"
            value={formValues.certificateType}
            options={certificateTypes}
          />
          <DateInput
            required
            label="Valid from"
            name="validFrom"
            placeholder="Click to select date"
            min={todayDate}
            defaultValue={initialValues.validFrom || formValues.validFrom}
            onChangeValue={handleInputChange}
          />
          <DateInput
            required
            label="Valid to"
            name="validTo"
            placeholder="Click to select date"
            disabled={!formValues.validFrom && !initialValues.validFrom}
            defaultValue={initialValues.validFrom || formValues.validTo}
            min={formatDateToYYYYMMDD(new Date(formValues.validFrom) as Date)}
            onChangeValue={handleInputChange}
          />
        </div>
        <div className="certificate-file-container">
          <FileUpload
            name="pdfUrl"
            label="Upload"
            accept="application/pdf"
            onChangeValue={handleInputChange}
            previewUrl={initialValues.pdfUrl || (formValues.pdfUrl as string)}
          />
          <div className="action-buttons">
            <Button type="submit" label="Save" />
            <Button
              label="Reset"
              type="reset"
              onClick={() => setFormValues(initialValues)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CertificateForm;
