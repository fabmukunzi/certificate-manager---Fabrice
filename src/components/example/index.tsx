import React from 'react';
import { certificates } from '@/utils/data/certificates';
import TableComponent from '../shared/table/Table';
import { ICertificateColumns } from '@/utils/types/certificate';

interface Column {
  header: string;
  accessor: keyof ICertificateColumns;
}

const CertificatesTable: React.FC = () => {
  const columns: Column[] = [
    { header: 'Supplier', accessor: 'supplier' },
    { header: 'Certificate Type', accessor: 'certificateType' },
    { header: 'Valid From', accessor: 'validFrom' },
    { header: 'Valid To', accessor: 'validTo' },
  ];

  if (!certificates || certificates.length === 0) {
    return <p>No certificates available.</p>;
  }

  return (
    <section aria-label="Certificates Table">
      <TableComponent columns={columns} data={certificates} />
    </section>
  );
};

export default CertificatesTable;
