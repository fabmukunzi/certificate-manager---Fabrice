import { CloseIcon, SearchIcon } from '@/assests/icons';
import Button from '@/components/shared/button';
import {
  getCertificateById,
  updateCertificate,
} from '@/database/certificate.controller';
import { disablePastDates } from '@/utils/functions/disableDates';
import routes from '@/utils/routes';
import { ICertificate, ICertificateFormData } from '@/utils/types/certificate';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditCertificate = () => {
  const [defaultValues, setDefaultValues] = useState<ICertificate | null>(null);
  const { certificateId } = useParams();
  const navigate = useNavigate();
  const [validFromInputType, setValidFromInputType] = useState('text');
  const [validToInputType, setValidToInputType] = useState('text');
  const [validFromDate, setValidFromDate] = useState<Date | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await getCertificateById(Number(certificateId));
        setDefaultValues(res);
        setPdfUrl(res?.pdfUrl || '');
      } catch (error) {
        console.error('Error initializing the database:', error);
      }
    };
    fetchCertificate();
  }, [certificateId]);

  useEffect(() => {
    if (defaultValues?.validFrom) {
      setValidFromDate(new Date(defaultValues.validFrom));
    }
  }, [defaultValues]);

  const todayDate = disablePastDates(
    validFromDate ? validFromDate : new Date(),
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPdfUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setDefaultValues((prevValues) => ({
      ...prevValues!,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!defaultValues) return;

    const formData = new FormData(event.currentTarget);
    const formValues: ICertificateFormData = {
      supplier: formData.get('supplier') as string,
      certificateType: formData.get('certificate-type') as string,
      validFrom: formData.get('validFrom') as string,
      validTo: formData.get('validTo') as string,
      pdfUrl: pdfUrl || defaultValues.pdfUrl,
    };

    try {
      await updateCertificate(Number(certificateId), formValues);
      navigate(routes.example1.url);
      setPdfUrl(null);
    } catch (error) {
      console.error('Error updating certificate:', error);
      alert('Failed to update certificate.');
    }
  };

  const certificateTypes = [
    { value: 'Permission of Printing', label: 'Permission of Printing' },
    { value: 'OHSAS 18001', label: 'OHSAS 18001' },
  ];

  return (
    <div style={{ marginTop: '50px' }}>
      <form id="form" className="certificate-form" onSubmit={handleSubmit}>
        <div className="certificate-info">
          <div className="certificate-input">
            <label htmlFor="supplier">Supplier</label>
            <input
              required
              minLength={3}
              type="text"
              name="supplier"
              id="supplier"
              value={defaultValues?.supplier || ''}
              onChange={handleInputChange}
            />
            <div className="search-input-icons">
              <img src={SearchIcon} alt="search icon" />
              <img src={CloseIcon} alt="close icon" />
            </div>
          </div>
          <div className="certificate-input">
            <label htmlFor="certificate-type">Certificate type</label>
            <select
              required
              name="certificate-type"
              id="certificate-type"
              value={defaultValues?.certificateType || ''}
              onChange={(e) => {
                setDefaultValues((prevValues) => ({
                  ...prevValues!,
                  certificateType: e.target.value,
                }));
              }}
            >
              <option value="">Select your option</option>
              {certificateTypes.map((certificateType, index) => (
                <option key={index} value={certificateType.value}>
                  {certificateType.label}
                </option>
              ))}
            </select>
          </div>
          <div className="certificate-input">
            <label htmlFor="validFrom">Valid from</label>
            <input
              required
              type={validFromInputType}
              min={todayDate}
              value={defaultValues?.validFrom || ''}
              onChange={(e) => {
                const dateValue = e.target.value;
                setDefaultValues((prevValues) => ({
                  ...prevValues!,
                  validFrom: dateValue,
                }));
                setValidFromDate(new Date(dateValue));
              }}
              onFocus={() => setValidFromInputType('date')}
              onBlur={() => setValidFromInputType('text')}
              placeholder="Click to select date"
              name="validFrom"
              id="validFrom"
            />
          </div>
          <div className="certificate-input">
            <label htmlFor="validTo">Valid to</label>
            <input
              required
              type={validToInputType}
              min={validFromDate ? disablePastDates(validFromDate) : todayDate}
              value={defaultValues?.validTo || ''}
              onChange={(e) =>
                setDefaultValues((prevValues) => ({
                  ...prevValues!,
                  validTo: e.target.value,
                }))
              }
              onFocus={() => setValidToInputType('date')}
              onBlur={() => setValidToInputType('text')}
              disabled={!validFromDate}
              placeholder="Click to select date"
              name="validTo"
              id="validTo"
            />
          </div>
        </div>
        <div className="certificate-file">
          <div>
            <label htmlFor="certificate-pdf" className="button">
              Upload
            </label>
            <input
              hidden
              type="file"
              name="certificate-pdf"
              id="certificate-pdf"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </div>
          <iframe
            height={100}
            width={80}
            style={{ zIndex: '99' }}
            src={pdfUrl || defaultValues?.pdfUrl || ''}
          ></iframe>
          <div className="action-buttons">
            <Button type="submit" label="Save" />
            <Button
              label="Reset"
              type="reset"
              onClick={() => setPdfUrl(null)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCertificate;
