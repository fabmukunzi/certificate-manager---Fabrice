import { EmptyIcon } from '@/assests/icons';
import './table.css';
import React from 'react';
import { useTranslate } from '@/contexts/AppContext';

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T]) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  caption?: string;
  className?: string;
  renderActions?: (id?: number) => React.ReactNode;
}

function TableComponent<T extends { id?: number }>({
  columns,
  data,
  caption,
  className,
  renderActions,
}: TableProps<T>): JSX.Element {
  const { translate } = useTranslate();
  if (data.length === 0) {
    return (
      <div className="no-data">
        <img src={EmptyIcon} />
        <p>{translate('No data available')}</p>
      </div>
    );
  }

  return (
    <div className={`table-container ${className}`}>
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
          {data.length === 0 ? (
            <tr>
              <td className="no-data" colSpan={columns.length + 1}>
                No data available
              </td>
            </tr>
          ) : (
            data.map((row) => (
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
