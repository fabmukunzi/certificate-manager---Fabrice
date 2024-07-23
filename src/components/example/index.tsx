import React, { useEffect, useRef, useState } from 'react';
import TableComponent from '../shared/table/Table';
import { ICertificate } from '@/utils/types/certificate';
import { getAllCertificates } from '@/database/certificate.controller';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../shared/button';
import routes from '@/utils/routes';
import ErrorComponent from '../shared/error';
import Loader from '../shared/loader';
import { SettingsIcon } from '@/assests/icons';

interface Column {
  header: string;
  accessor: keyof ICertificate;
}

const CertificatesTable: React.FC = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<ICertificate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<number | undefined>(undefined);
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
  const renderActions = (id?: number) => (
    <div className="">
      <img
        className="setting-icon"
        width={20}
        height={20}
        src={SettingsIcon}
        alt="Setting icon"
        onClick={() => setIsOpen(isOpen === id ? undefined : id)}
      />
      {isOpen === id && (
        <div ref={popupRef} className="setting-action-buttons">
          <Button
            onClick={() => navigate(`${routes.example1.url}/${id}`)}
            label="Edit"
          />
          <Button label="Delete" />
        </div>
      )}
    </div>
  );
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(undefined);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
        <TableComponent
          renderActions={renderActions}
          columns={columns}
          data={certificates || []}
        />
      )}
    </section>
  );
};

export default CertificatesTable;
