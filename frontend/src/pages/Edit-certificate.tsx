import CertificateForm from '@/components/example/certificate/CertificateForm';
import ErrorComponent from '@/components/shared/error';
// import { getCertificateById } from '@/database/certificate.controller';
import routes from '@/utils/routes';
import { CertificateDto, CertificateType } from '@/utils/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// This component represents a page used to edit a certificate.
const EditCertificatePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<CertificateDto>({
    id: 0,
    supplier: {
      id: 2,
      createdAt: new Date('2024-09-27T13:41:59.317239'),
      updatedAt: new Date('2024-09-27T13:41:59.317239'),
      name: 'Vicky Luanda',
      city: 'Luanda',
      index: 'MD25HM',
    },
    certificateType: CertificateType.PERMISSION_OF_PRINTING,
    validFrom: new Date(),
    validTo: new Date(),
    pdfUrl: '',
    comments: [],
    certificateAssignedUsers: [],
  });
  const { certificateId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setIsLoading(true);
        if (!certificateId || isNaN(Number(certificateId))) {
          alert('Invalid certificate ID');
          navigate(routes.certificates.url);
          return;
        }
        const res = await axios.get(`/backend/certificates/${certificateId}`);
        setDefaultValues(res.data.data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log(error.response.data);
          alert(error.response.data.error || 'Something went wrong');
        }
        navigate(routes.certificates.url);
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
  console.log(defaultValues);
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
