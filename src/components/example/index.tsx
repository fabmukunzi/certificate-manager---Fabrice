import { certificates } from '@/utils/data/certificates';
import TableComponent from '../shared/table/Table';

const Certificates = () => {
  const columns = [
    { header: 'Supplier', accessor: 'supplier' },
    { header: 'Certificate Type', accessor: 'certificateType' },
    { header: 'Valid From', accessor: 'validFrom' },
    { header: 'Valid To', accessor: 'validTo' },
  ];

  return (
    <div>
      <TableComponent columns={columns} data={certificates} />
    </div>
  );
};

export default Certificates;
