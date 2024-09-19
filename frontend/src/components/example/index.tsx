import React, { useEffect, useState } from 'react';
import TableComponent from '../shared/table/Table';
import { Column, ICertificate } from '@/utils/types/certificate';
import {
  deleteCertificate,
  getAllCertificates,
} from '@/database/certificate.controller';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../shared/button';
import routes from '@/utils/routes';
import ErrorComponent from '../shared/error';
import Loader from '../shared/loader';
import ActionMenu from '../shared/table/ActionMenu';
import { useTranslate } from '@/contexts/AppContext';

const CertificatesTable: React.FC = () => {
  const navigate = useNavigate();
  const { translate } = useTranslate(); // Use the translate function from the context
  const [certificates, setCertificates] = useState<ICertificate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const columns: Column[] = [
    { header: translate('Supplier'), accessor: 'supplier' },
    { header: translate('Certificate Type'), accessor: 'certificateType' },
    { header: translate('Valid From'), accessor: 'validFrom' },
    { header: translate('Valid To'), accessor: 'validTo' },
  ];

  const fetchCertificates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllCertificates();
      setCertificates(response);
    } catch (err) {
      setError(
        translate('Failed to fetch certificates. Please try again later.'),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleEdit = (id?: number) => {
    navigate(`${routes.certificates.url}/${id}`);
  };

  const handleDelete = async (id?: number) => {
    if (
      confirm(translate('Are you sure you want to delete this certificate?'))
    ) {
      try {
        await deleteCertificate(id);
        await fetchCertificates();
      } catch (error) {
        alert('Failed to delete certificate.');
      }
    }
  };

  return (
    <section aria-label={translate('Certificates Table')}>
      <Link to={routes.newCertificate.url}>
        <Button
          label={translate('New Certificate')}
          className="new-certificate-button"
        />
      </Link>
      {loading ? (
        <Loader message={translate('Loading Certificates')} />
      ) : error ? (
        <ErrorComponent message={error} />
      ) : !certificates || certificates.length === 0 ? (
        <p>{translate('No certificates available.')}</p>
      ) : (
        <TableComponent
          renderActions={(id) => (
            <ActionMenu id={id} onEdit={handleEdit} onDelete={handleDelete} />
          )}
          columns={columns}
          data={certificates || []}
        />
      )}
    </section>
  );
};

export default CertificatesTable;