import React from 'react';
import './table.css';

interface Column {
  header: string;
  accessor: string;
}

interface TableProps {
  columns: Column[];
  data: { [key: string]: string }[];
}

const TableComponent: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <section className="table-container">
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th></th>
              {columns.map((column, index) => (
                <th key={index}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td></td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column.accessor]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data yet</p>
      )}
    </section>
  );
};

export default TableComponent;
