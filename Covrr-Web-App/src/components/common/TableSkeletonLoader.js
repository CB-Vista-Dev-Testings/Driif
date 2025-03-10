import React from 'react';

const SkeletonLoader = ({ rows = 5, columns = 6 }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <tbody>
          {Array.from(new Array(rows)).map((_, rowIndex) => (
            <tr key={rowIndex} className="py-4">
              {Array.from(new Array(columns)).map((_, colIndex) => (
                <td key={colIndex} className="p-4">
                  <div className="animate-pulse bg-muted2 rounded-sm h-7 w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonLoader;