import React, { useState, useRef, useEffect } from 'react';
import './table.css';
import { SettingsIcon } from '@/assests/icons';
import Button from '../button';
import routes from '@/utils/routes';
import { useNavigate } from 'react-router-dom';
import { deleteCertificate } from '@/database/certificate.controller'; // Ensure correct import path

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T]) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  caption?: string;
}

function TableComponent<T extends { id: number }>({
  columns,
  data,
  caption,
}: TableProps<T>): JSX.Element {
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      try {
        await deleteCertificate(id);
        location.reload();
      } catch (error) {
        console.error('Failed to delete certificate:', error);
        alert('Failed to delete certificate.');
      }
    }
  };

  if (data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="table-container">
      <table>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            <th></th>
            {columns.map((column) => (
              <th key={String(column.accessor)} scope="col">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>
                <img
                  className="setting-icon"
                  width={20}
                  height={20}
                  src={SettingsIcon}
                  alt="Setting icon"
                  onClick={() => setIsOpen(isOpen === row.id ? null : row.id)}
                />
                {isOpen === row.id && (
                  <div ref={popupRef} className="setting-action-buttons">
                    <Button
                      onClick={() =>
                        navigate(`${routes.example1.url}/${row.id}`)
                      }
                      label="Edit"
                    />
                    <Button
                      onClick={() => handleDelete(row.id)}
                      label="Delete"
                    />
                  </div>
                )}
              </td>
              {columns.map((column) => (
                <td key={`${row.id}-${String(column.accessor)}`}>
                  {column.render
                    ? column.render(row[column.accessor])
                    : String(row[column.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
