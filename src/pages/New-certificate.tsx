import CertificateForm from '@/components/example/certificate/CertificateForm';
const Newcertificate = () => {
  const initialValues = {
    supplier: '',
    certificateType: '',
    validFrom: '',
    validTo: '',
    pdfUrl: null,
  };
  return (
    <div className="certificate-form-container">
      <p>Create new certificate</p>
      <CertificateForm initialValues={initialValues} />
    </div>
  );
};

export default Newcertificate;
