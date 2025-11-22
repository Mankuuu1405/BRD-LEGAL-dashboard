import React from 'react';

export const StatCard = ({ title, value, trend, path, onClick }) => (
  <div 
    className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-300 cursor-pointer`}
    onClick={() => onClick(path)}
  >
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <div className="mt-2 flex items-baseline">
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      {trend && (
        <span className={`ml-2 text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
  </div>
);

export const SimpleTable = ({ headers, data, onRowSelect = () => {}, selectedRows = [] }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {onRowSelect && (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                onChange={() => {
                  if (onRowSelect) {
                    if (selectedRows.length === data.length) {
                      onRowSelect([]);
                    } else {
                      onRowSelect(data.map((_, index) => index));
                    }
                  }
                }}
                checked={selectedRows.length === data.length && data.length > 0}
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
            </th>
          )}
          {headers.map((header, idx) => (
            <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, idx) => (
          <tr key={idx}>
            {onRowSelect && (
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(idx)}
                  onChange={() => onRowSelect(idx)}
                  className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                />
              </td>
            )}
            {headers.map((header, cellIdx) => (
              <td key={cellIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const DashboardMetrics = ({ items, onClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {items.map((item, idx) => (
      <StatCard key={idx} {...item} onClick={onClick} />
    ))}
  </div>
);