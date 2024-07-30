import Certificates from '@/components/example';
import routes from '@/utils/routes';
import { FC } from 'react';

const CertificatesPage: FC = () => {
  return (
    <section className="example-container">
      <div className="example-content" aria-label="CertificatesPage content">
        <p>{routes.certificates.label}</p>
        <Certificates />
      </div>
    </section>
  );
};

export default CertificatesPage;
