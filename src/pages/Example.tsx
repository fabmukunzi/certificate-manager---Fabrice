import CertificatesTable from '@/components/example';
import { FC } from 'react';

const Example: FC = () => {
  return (
    <section className="example-container">
      <div className="example-content" aria-label="Example1 content">
        <p>Example 1</p>
        <CertificatesTable />
      </div>
    </section>
  );
};

export default Example;
