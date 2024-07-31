import Certificates from '@/components/example';
import { useTranslate } from '@/contexts/AppContext';
import routes from '@/utils/routes';
import { FC } from 'react';

const CertificatesPage: FC = () => {
  const { translate } = useTranslate();
  return (
    <section className="example-container">
      <div className="example-content" aria-label="CertificatesPage content">
        <p>{translate(routes.certificates.label)}</p>
        <Certificates />
      </div>
    </section>
  );
};

export default CertificatesPage;
