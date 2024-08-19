import CertificateForm from '@/components/example/certificate/CertificateForm';
import { useTranslate } from '@/contexts/AppContext';
const Newcertificate = () => {
  const { translate } = useTranslate();
  const initialValues = {
    supplier: '',
    certificateType: '',
    validFrom: '',
    validTo: '',
    pdfUrl: null,
    comments: [],
  };
  return (
    <div className="certificate-form-container">
      <p>{translate('Create new certificate')}</p>
      <CertificateForm initialValues={initialValues} />
    </div>
  );
};

export default Newcertificate;
