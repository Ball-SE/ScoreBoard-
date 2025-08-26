function AddCourse() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              เพิ่มข้อมูลรายวิชา
            </h2>
            <p className="text-gray-600">กรอกข้อมูลนักเรียนและรายวิชา</p>
          </div>

          {/* Student Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              ข้อมูลนักเรียน
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="รหัสประจำตัวประชาชน"
                className="w-full border-2 border-gray-200 rounded-lg p-4 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
              />
              <input
                type="text"
                placeholder="ชื่อ-นามสกุล"
                className="w-full border-2 border-gray-200 rounded-lg p-4 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
              />
              <input
                type="text"
                placeholder="ระดับชั้น"
                className="w-full border-2 border-gray-200 rounded-lg p-4 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
              />
            </div>
          </div>

          {/* Course Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              ข้อมูลรายวิชา
            </h3>
            <input
              type="text"
              placeholder="รายวิชา"
              className="w-full border-2 border-gray-200 rounded-lg p-4 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
            />
          </div>

          {/* Score Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              คะแนนสอบ
            </h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                {/* Listening Score */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    Listening (100)
                  </label>
                  <input
                    type="text"
                    placeholder="คะแนนที่ได้"
                    className="flex-1 border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                  />
                </div>

                {/* Reading (100) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    Reading (100)
                  </label>
                  <input
                    type="text"
                    placeholder="คะแนนที่ได้"
                    className="flex-1 border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                  />
                </div>

                {/* Writing (100) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    Writing (100)
                  </label>
                  <input
                    type="text"
                    placeholder="คะแนนที่ได้"
                    className="flex-1 border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                  />
                </div>

                {/* Total (300) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    Writing (100)
                  </label>
                  <input
                    type="text"
                    placeholder="คะแนนที่ได้"
                    className="flex-1 border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                  />
                </div>

                {/* Total (300) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    Total (300)
                  </label>
                  <input
                    type="text"
                    placeholder="คะแนนที่ได้"
                    className="flex-1 border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                  />
                </div>

                {/* Passing Status Passing Score (180) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    Passing Status Passing Score (180)
                  </label>
                  <input
                    type="text"
                    placeholder="คะแนนที่ได้"
                    className="flex-1 border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                  />
                </div>

                {/* Test Level */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    Test Level
                  </label>
                  <input
                    type="text"
                    placeholder="คะแนนที่ได้"
                    className="flex-1 border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                  />
                </div>

                {/* Test Calendar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    Test Calendar
                  </label>
                  <input
                    type="text"
                    placeholder="วัน/เดือน/ปี"
                    className="flex-1 border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                  />
                </div>

                {/* Notes */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    Notes
                  </label>
                  <input
                    type="text"
                    placeholder="Input Text"
                    className="flex-1 border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                  />
                </div>

                {/* Saved By */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    Saved By
                  </label>
                  <input
                    type="text"
                    placeholder="Input Text"
                    className="flex-1 border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                  />
                </div>

                {/* Status */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    Status
                  </label>
                  <input
                    type="text"
                    placeholder="ผ่าน/ไม่ผ่าน"
                    className="flex-1 border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              เพิ่มวิชา
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
