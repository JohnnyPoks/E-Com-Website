const UserList = ({ columns, data }) => {
  localStorage.setItem("cstNum", data.length);
  return (
    <div className="overflow-x-auto px-8">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-900"
              >
                {col}
              </th>
            ))}
            <th className="border border-gray-300 px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border border-gray-300 hover:bg-gray-50">
              {columns.map((col, colIdx) => (
                <td
                  key={colIdx}
                  className="border border-gray-300 px-6 py-4 text-sm text-gray-700"
                >
                  {row[col.toLowerCase()]}
                </td>
              ))}
              <td className="border border-gray-300 px-6 py-4 text-right">
                <button className="text-blue-500 hover:underline">...</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
