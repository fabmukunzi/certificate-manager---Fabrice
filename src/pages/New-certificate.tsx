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
      <CertificateForm initialValues={initialValues} />
    </div>
  );
};

export default Newcertificate;
