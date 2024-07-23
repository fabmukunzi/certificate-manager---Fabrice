import Button from '@/components/shared/button';
import { addCertificate } from '@/database/certificate.controller';
import { useState } from 'react';
import './certificate.css';
import { useNavigate } from 'react-router-dom';
import routes from '@/utils/routes';
import { CloseIcon, SearchIcon } from '@/assests/icons';
import { disablePastDates } from '@/utils/functions/disableDates';

const CertificateForm = () => {
  const [validFromInputType, setValidFromInputType] = useState('text');
  const [validToInputType, setValidToInputType] = useState('text');
  const [validFromDate, setValidFromDate] = useState<Date | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const todayDate = disablePastDates(new Date());

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = {
      supplier: formData.get('supplier'),
      certificateType: formData.get('certificate-type'),
      validFrom: formData.get('validFrom'),
      validTo: formData.get('validTo'),
      pdfUrl,
    };
    try {
      await addCertificate(formValues);
      navigate(routes.example1.url);
      setPdfUrl(null);
    } catch (error) {
      console.error('Error adding certificate:', error);
      alert('Failed to add certificate.');
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
            />
            <div className="search-input-icons">
              <img src={SearchIcon} alt="search icon" />
              <img src={CloseIcon} alt="close icon" />
            </div>
          </div>
          <div className="certificate-input">
            <label htmlFor="certificate-type">Certificate type</label>
            <select required name="certificate-type" id="certificate-type">
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
              onChange={(e) => setValidFromDate(new Date(e.target.value))}
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
            src={pdfUrl || ''}
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

export default CertificateForm;
