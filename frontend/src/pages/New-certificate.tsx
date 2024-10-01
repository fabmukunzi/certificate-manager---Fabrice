import CertificateForm from '@/components/example/certificate/CertificateForm';
import { useTranslate } from '@/contexts/AppContext';
import { CertificateType } from '@/endpoints';
import { FORM_MODE } from '@/utils/enums/formMode';
const Newcertificate = () => {
  const { translate } = useTranslate();
  const initialValues = {
    id: 0,
    supplier: {
      id: 0,
      name: '',
      city: '',
      index: '',
    },
    certificateType: CertificateType.PERMISSION_OF_PRINTING,
    validFrom: new Date(),
    validTo: new Date(),
    pdfUrl: '',
    comments: [],
    certificateAssignedUsers: [],
  };
  return (
    <div className="certificate-form-container">
      <p>{translate('Create new certificate')}</p>
      <CertificateForm mode={FORM_MODE.CREATE} initialValues={initialValues} />
    </div>
  );
};

export default Newcertificate;
