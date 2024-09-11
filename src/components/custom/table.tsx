import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

// TableHeader Component
const TableHeader: React.FC<{ headers: string[] }> = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map(header => (
          <th key={header} className="text-center text-sm font-bold text-gray-700">
            {header}
          </th>
        ))}
        <th className="text-center">Actions</th>
      </tr>
    </thead>
  );
};

// TableBody Component
const TableBody: React.FC<{ rows: Array<{ [key: string]: string }>, showIcons?: boolean }> = ({ rows, showIcons = true }) => {
  return (
    <tbody>
      {rows.map((row, index) => (
        <tr key={index} className="border-b border-gray-200">
          {Object.keys(row).map((key, cellIndex) => (
            <td key={cellIndex} className="text-center text-sm text-gray-600">
              {row[key]}
            </td>
          ))}
          {showIcons && (
            <td className="flex justify-center space-x-3">
              <button className="text-green-500 hover:text-green-700 p-2 rounded">
                <FaEdit />
              </button>
              <button className="text-red-500 hover:text-red-700 p-2 rounded">
                <FaTrashAlt />
              </button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

// Full Table Component
const Table: React.FC<{ headers: string[], rows: Array<{ [key: string]: string }>, showIcons?: boolean }> = ({ headers, rows, showIcons = false }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed border-collapse shadow- rounded-md">
        <TableHeader headers={headers} />
        <TableBody rows={rows} showIcons={showIcons} />
      </table>
    </div>
  );
};

export default Table;
