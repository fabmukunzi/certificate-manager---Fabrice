import CertificateForm from '@/components/example/certificate/CertificateForm';
import { useTranslate } from '@/contexts/AppContext';
import { CertificateType } from '@/utils/types';
const Newcertificate = () => {
  const { translate } = useTranslate();
  const initialValues = {
    id: 0,
    supplier: {
      id: 2,
      createdAt: new Date('2024-09-27T13:41:59.317239'),
      updatedAt: new Date('2024-09-27T13:41:59.317239'),
      name: 'Vicky Luanda',
      city: 'Luanda',
      index: 'MD25HM',
    },
    certificateType: CertificateType.OHSAS_18001,
    validFrom: new Date(),
    validTo: new Date(),
    pdfUrl: '',
    comments: [],
    certificateAssignedUsers: [],
  };
  return (
    <div className="certificate-form-container">
      <p>{translate('Create new certificate')}</p>
      <CertificateForm initialValues={initialValues} />
    </div>
  );
};

export default Newcertificate;
