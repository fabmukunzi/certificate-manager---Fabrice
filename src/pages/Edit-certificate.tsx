import CertificateForm from '@/components/example/certificate/CertificateForm';
import { getCertificateById } from '@/database/certificate.controller';
import { ICertificate } from '@/utils/types/certificate';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditCertificatePage = () => {
  const [defaultValues, setDefaultValues] = useState<ICertificate>({
    supplier: '',
    certificateType: '',
    validFrom: '',
    validTo: '',
    pdfUrl: null,
  });
  const { certificateId } = useParams();

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await getCertificateById(Number(certificateId));
        setDefaultValues(res);
      } catch (error) {
        console.error('Error initializing the database:', error);
      }
    };
    fetchCertificate();
  }, [certificateId]);
  return (
    <section
      className="edit-certificate-container"
      style={{ marginTop: '50px' }}
    >
      <CertificateForm initialValues={defaultValues} />
    </section>
  );
};

export default EditCertificatePage;
