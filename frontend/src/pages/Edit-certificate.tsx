import CertificateForm from '@/components/example/certificate/CertificateForm';
import ErrorComponent from '@/components/shared/error';
import routes from '@/utils/routes';
import { CertificateDto, CertificateType } from '@/endpoints';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosInstance } from '@/utils/AxiosInstance';
import { FORM_MODE } from '@/utils/enums/formMode';

// This component represents a page used to edit a certificate.
const EditCertificatePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<CertificateDto>({
    id: 0,
    supplier: {
      id: 0,
      name: '',
      city: '',
      index: '',
    },
    type: CertificateType.PERMISSION_OF_PRINTING,
    validFrom: new Date(),
    validTo: new Date(),
    pdfUrl: '',
    comments: [],
    assignedUsers: [],
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
        const res = await AxiosInstance.getCertificateById(
          parseInt(certificateId),
        );
        setDefaultValues(res.data.data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
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
  return (
    <section
      className="edit-certificate-container"
      style={{ marginTop: '50px' }}
    >
      <CertificateForm mode={FORM_MODE.EDIT} initialValues={defaultValues} />
    </section>
  );
};

export default EditCertificatePage;
