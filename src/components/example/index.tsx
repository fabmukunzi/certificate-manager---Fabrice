import React, { useEffect, useState } from 'react';
import TableComponent from '../shared/table/Table';
import { ICertificate, ICertificateColumns } from '@/utils/types/certificate';
import { getAllCertificates } from '@/database/certificate.controller';
import { Link } from 'react-router-dom';
import Button from '../shared/button';
import routes from '@/utils/routes';

interface Column {
  header: string;
  accessor: keyof ICertificateColumns;
}

const CertificatesTable: React.FC = () => {
  const [certificates, setCertificates] = useState<ICertificate[]>([]);
  const columns: Column[] = [
    { header: 'Supplier', accessor: 'supplier' },
    { header: 'Certificate Type', accessor: 'certificateType' },
    { header: 'Valid From', accessor: 'validFrom' },
    { header: 'Valid To', accessor: 'validTo' },
  ];

  useEffect(() => {
    const fetchCertificates = async () => {
      const response = await getAllCertificates();
      setCertificates(response);
    };
    fetchCertificates();
  }, []);
  const transformedData = certificates.map((certificate) => ({
    id: certificate.id,
    supplier: certificate.supplier,
    certificateType: certificate.certificateType,
    validFrom: certificate.validFrom,
    validTo: certificate.validTo,
  }));
  return (
    <section aria-label="Certificates Table">
      <Link to={routes.newCertificate.url}>
        <Button label="New Certificate" className="new-certificate-button" />
      </Link>
      {!certificates || certificates.length === 0 ? (
        <p>No certificates available.</p>
      ) : (
        <TableComponent columns={columns} data={transformedData || []} />
      )}
    </section>
  );
};

export default CertificatesTable;
