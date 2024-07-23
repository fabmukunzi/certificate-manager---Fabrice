import './table.css';
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
