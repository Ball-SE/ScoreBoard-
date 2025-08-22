function TableScore() {
  return (
    <div className="flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Main Content 3: ตารางคะแนน*/}
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            ตารางคะแนนสอบ
          </h2>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                    รหัสวิชา
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                    ชื่อวิชา
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                    คะแนนสอบกลางภาค
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                    คะแนนสอบปลายภาค
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                    สถานะ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    CS101
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    หลักการเขียนโปรแกรมคอมพิวเตอร์
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    9/10
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    85/100
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ผ่าน
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    CS102
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    โครงสร้างข้อมูลและอัลกอริทึม
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    1/10
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    78/100
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ผ่าน
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    CS103
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    ฐานข้อมูล
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    7/10
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    92/100
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ผ่าน
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    CS104
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    การวิเคราะห์และออกแบบระบบ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    8/10
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    60/100
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ผ่าน
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    CS105
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    การเขียนโปรแกรมเว็บ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    3/10
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    50/100
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      ไม่ผ่าน
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>แสดง 5 รายการ จาก 8 รายการ</span>
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
