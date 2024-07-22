import Button from '@/components/shared/Button';
import { addCertificate } from '@/database/controllers/add-certificate';
import { useState } from 'react';

const CertificateForm = () => {
  const [valiFromInputType, setValidFromInputType] = useState('text');
  const [validToInputType, setValidToInputType] = useState('text');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      const fileURL = URL.createObjectURL(selectedFile);
      setPdfUrl(fileURL);
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
      event.currentTarget.reset();
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
      <form className="certificate-form" onSubmit={handleSubmit}>
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
          </div>
          <div className="certificate-input">
            <label htmlFor="certificate-type">Certificate type</label>
            <select required name="certificate-type" id="certificate-type">
              <option value="">Select your option</option>
              {certificateTypes?.map((certificateType, index) => (
                <option key={index} value={certificateType.value}>
                  {certificateType.label}
                </option>
              ))}
            </select>
          </div>
          <div className="certificate-input">
            <label htmlFor="validFrom">valid from</label>
            <input
              required
              min={new Date().toString()}
              type={valiFromInputType}
              onFocus={() => setValidFromInputType('date')}
              onBlur={() => setValidFromInputType('text')}
              placeholder="Click to select date"
              name="validFrom"
              id="validFrom"
            />
          </div>
          <div className="certificate-input">
            <label htmlFor="validTo">valid to</label>
            <input
              required
              type={validToInputType}
              onFocus={() => setValidToInputType('date')}
              onBlur={() => setValidToInputType('text')}
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
            frameBorder="0"
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
