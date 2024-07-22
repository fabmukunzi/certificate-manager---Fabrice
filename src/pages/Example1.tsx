import Certificates from '@/components/example';
import { FC } from 'react';

const Example1: FC = () => {
  return (
    <section className="example-container">
      <div className="example-content" aria-label="Example1 content">
        <p>Example 1</p>
        <Certificates />
      </div>
    </section>
  );
};

export default Example1;
