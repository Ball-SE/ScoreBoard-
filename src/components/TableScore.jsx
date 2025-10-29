function TableScore({student}) {
  // สร้างแถวข้อมูลแบบ flatten เพื่อ map ได้ง่ายและมี index ต่อเนื่อง
  const rows = student.flatMap(s => 
    (s.scores || []).map(score => ({ s, score }))
  );
  const totalResults = rows.length;

  return (
    <div className="flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Main Content 3: ตารางคะแนน*/}
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            ตารางคะแนนสอบ
          </h2>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg text-center">
              <thead className="bg-gradient-to-r from-gray-800 to-gray-900 text-white ">
                <tr>
                  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    NO. 
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Student ID 
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Listening (100)
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Reading (100)
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Writing (100)
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Total (300)
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Passing Score (180)
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Test Level
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Test Calendar
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Saved By
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rows.map((row, index) => (
                  <tr key={`${row.s.id}-${index}`} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.s.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.s.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.score.listening || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.score.reading || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.score.writing || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.score.total || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.score.passing || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.score.testLevel || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.score.testCalendar || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.score.notes || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.score.savedBy || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row.score.status === 'PASS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {row.score.status || '-'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>แสดง {totalResults} รายการ จาก {totalResults} รายการ</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                ก่อนหน้า
              </button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                ถัดไป
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableScore;