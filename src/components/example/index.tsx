import React, { useEffect, useState } from 'react';
import TableComponent from '../shared/table/Table';
import { ICertificate } from '@/utils/types/certificate';
import { getAllCertificates } from '@/database/certificate.controller';
import { Link } from 'react-router-dom';
import Button from '../shared/button';
import routes from '@/utils/routes';
import ErrorComponent from '../shared/error';
import Loader from '../shared/loader';

interface Column {
  header: string;
  accessor: keyof ICertificate;
}

const CertificatesTable: React.FC = () => {
  const [certificates, setCertificates] = useState<ICertificate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const columns: Column[] = [
    { header: 'Supplier', accessor: 'supplier' },
    { header: 'Certificate Type', accessor: 'certificateType' },
    { header: 'Valid From', accessor: 'validFrom' },
    { header: 'Valid To', accessor: 'validTo' },
  ];

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllCertificates();
        setCertificates(response);
      } catch (err) {
        setError('Failed to fetch certificates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  return (
    <section aria-label="Certificates Table">
      <Link to={routes.newCertificate.url}>
        <Button label="New Certificate" className="new-certificate-button" />
      </Link>
      {loading ? (
        <Loader message="Loading Certificates" />
      ) : error ? (
        <ErrorComponent message={error} />
      ) : !certificates || certificates.length === 0 ? (
        <p>No certificates available.</p>
      ) : (
        <TableComponent columns={columns} data={certificates || []} />
      )}
    </section>
  );
};

export default CertificatesTable;
