import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

// TableHeader Component
const TableHeader: React.FC<{ headers: string[] }> = ({ headers }) => {
  return (
    <thead>
      <tr className="border-b border-gray-300">
        {headers.map(header => (
          <th
            key={header}
            className="px-6 py-3 text-center text-sm font-bold text-black border-r border-gray-300"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

// TableBody Component
const TableBody: React.FC<{ rows: Array<{ [key: string]: string }>, showIcons?: boolean }> = ({ rows, showIcons = true }) => {
  return (
    <tbody>
      {rows.map((row, index) => (
        <tr key={index} className="border-b border-gray-300">
          {Object.keys(row).map((key, cellIndex) => (
            <td
              key={cellIndex}
              className="px-2 py-2  text-center text-sm text-black border-r border-gray-300"
            >
              {row[key]}
            </td>
          ))}
          {showIcons && (
            <td className="px-2 py-1 text-center text-sm flex justify-center space-x-4">
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

// Table component full 

const Table: React.FC<{ headers: string[], rows: Array<{ [key: string]: string }>, showIcons?: boolean }> = ({ headers, rows, showIcons = false }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full max-h-96 overflow-y-auto table-auto border-collapse bg-white shadow-lg rounded-lg">
        <TableHeader headers={headers} />
        <TableBody rows={rows} showIcons={showIcons} />
      </table>
    </div>
  );
};

export default Table;
