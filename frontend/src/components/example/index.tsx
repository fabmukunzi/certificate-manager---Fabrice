import React, { useEffect, useState } from 'react';
import TableComponent, { Column } from '../shared/table/Table';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../shared/button';
import routes from '@/utils/routes';
import ErrorComponent from '../shared/error';
import Loader from '../shared/loader';
import ActionMenu from '../shared/table/ActionMenu';
import { useTranslate } from '@/contexts/AppContext';
import { CertificateDto, CertificateType, SupplierDto } from '@/endpoints';
import { formatDateToDot } from '@/utils/functions/formatDate';
import { AxiosInstance } from '@/utils/AxiosInstance';
import { useToast } from '@/contexts/ToastContext';

const CertificatesTable: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { translate } = useTranslate(); // Use the translate function from the context
  const [certificates, setCertificates] = useState<CertificateDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const columns: Column<CertificateDto>[] = [
    {
      header: translate('Supplier'),
      accessor: 'supplier',
      render: (supplier) => (
        <>
          {(supplier as SupplierDto)?.name}, {(supplier as SupplierDto)?.id},{' '}
          {(supplier as SupplierDto)?.city}
        </>
      ),
    },
    {
      header: translate('Certificate Type'),
      accessor: 'type',
      render: (type) => (
        <>
          {type === CertificateType.PERMISSION_OF_PRINTING
            ? translate('Permission of Printing')
            : 'OHSAS 18001'}
        </>
      ),
    },
    {
      header: translate('Valid From'),
      accessor: 'validFrom',
      render: (date) => <>{formatDateToDot(new Date(date as Date))}</>,
    },
    {
      header: translate('Valid To'),
      accessor: 'validTo',
      render: (date) => <>{formatDateToDot(new Date(date as Date))}</>,
    },
  ];

  const fetchCertificates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AxiosInstance.getAllCertificates();
      setCertificates(response.data.data);
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
        await AxiosInstance.deleteCertificate(Number(id));
        await fetchCertificates();
      } catch (error) {
        showToast('error', '❌ Failed to delete certificate.');
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
