import React, { useState, useRef, useEffect } from 'react';
import './table.css';
// import { SettingsIcon } from '@/assests/icons';
// import Button from '../button';
// import routes from '@/utils/routes';
// import { useNavigate } from 'react-router-dom';

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T]) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  caption?: string;
  renderActions?: (id?: number) => React.ReactNode;
}

function TableComponent<T extends { id?: number }>({
  columns,
  data,
  caption,
  renderActions,
}: TableProps<T>): JSX.Element {
  // const popupRef = useRef<HTMLDivElement | null>(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       popupRef.current &&
  //       !popupRef.current.contains(event.target as Node)
  //     ) {
  //       setIsOpen(null);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

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
              <td>{renderActions ? renderActions(row.id) : null}</td>
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
