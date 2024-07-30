import CertificateForm from '@/components/example/certificate/CertificateForm';
import ErrorComponent from '@/components/shared/error';
import { getCertificateById } from '@/database/certificate.controller';
import { ICertificate } from '@/utils/types/certificate';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// This component represents a page used to edit a certificate.
const EditCertificatePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        setIsLoading(true);
        if (!certificateId || isNaN(Number(certificateId))) {
          console.error('Invalid certificate ID');
          return;
        }
        const res = await getCertificateById(Number(certificateId));
        setDefaultValues(res);
        setIsLoading(false);
      } catch (error) {
        console.error(
          `Error fetching certificate with ID ${certificateId}:`,
          error,
        );
        setIsLoading(false);
      }
    };
    fetchCertificate();
  }, [certificateId]);
  const areInitialValuesEmpty = Object.values(defaultValues || {}).every(
    (value) => value === '' || value === null,
  );
  if (areInitialValuesEmpty && !isLoading)
    return (
      <ErrorComponent
        message={`Certificate with ID ${certificateId} is not found`}
      />
    );
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
