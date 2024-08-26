import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

// TableHeader Component
const TableHeader: React.FC<{ headers: string[] }> = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map(header => (
          <th key={header} className="px-6 py-3 text-left text-lg font-bold text-gray-700">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};
const TableBody: React.FC<{ rows: Array<{ [key: string]: string }>, showIcons?: boolean }> = ({ rows, showIcons = true }) => {
  return (
    <tbody>
      {rows.map((row, index) => (
        <tr key={index} className="border-b">
          {Object.keys(row).map((key, cellIndex) => (
            <td key={cellIndex} className="px-6 py-4 text-sm text-gray-900">
              {row[key]}
            </td>
          ))}
          {showIcons && (
            <td className="px-6 py-4 text-sm flex space-x-4">
              <button className="text-green-500 hover:text-green-700 bg-white p-2 rounded">
                <FaEdit className="text-xl font-bold" />
              </button>
              <button className="text-red-500 hover:text-red-700 bg-white p-2 rounded">
                <FaTrashAlt className="text-xl font-bold" />
              </button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

// Main Table Component
const Table: React.FC<{ headers: string[], rows: Array<{ [key: string]: string }>, showIcons?: boolean }> = ({ headers, rows, showIcons = false }) => {
  return (
    <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg">
      <TableHeader headers={headers} />
      <TableBody rows={rows} showIcons={showIcons} />
    </table>
  );
};

export default Table;
