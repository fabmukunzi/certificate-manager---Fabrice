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
  renderActions?: (id: number) => React.ReactNode;
}

function TableComponent<T extends { id?: number }>({
  columns,
  data,
  caption,
  className,
  renderActions,
}: TableProps<T>): JSX.Element {
<<<<<<< HEAD
  const { translate } = useTranslate();
=======
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

>>>>>>> baa1b21 (Task4 KAN-61: edit certificate)
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
                {translate(column.header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{renderActions ? row?.id && renderActions(row.id) : null}</td>
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
