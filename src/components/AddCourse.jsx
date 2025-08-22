function AddCourse() {
  return (
    <div className="flex flex-col justify-center items-center p-6">
      <div className="w-full ">
        <div className="bg-white rounded-lg shadow-md p-6 w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            เพิ่มข้อมูลรายวิชา
          </h2>
          <div className="flex flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="รหัสประจำตัวประชาชน"
              className="w-full border-2 border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none transition-colors"
            />
            <input
              type="text"
              placeholder="ชื่อ-นามสกุล"
              className="w-full border-2 border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none transition-colors"
            />
            <input
              type="text"
              placeholder="ระดับชั้น"
              className="w-full border-2 border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="รายวิชา"
              className="w-[300px] border-2 border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-row gap-4">
          <div className="bg-white shadow-md w-1/2 flex flex-col gap-4 mb-4 p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-left">
              คะแนนสอบกลางภาค
            </h2>
            <div className="flex flex-row gap-4">
              <input
                type="text"
                placeholder="คะแนนที่ได้"
                className="w-1/2 border-2 border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none transition-colors"
              />
              <span className="text-gray-500 text-lg text-center flex items-center justify-center">
                /
              </span>
              <input
                type="text"
                placeholder="คะแนนเต็ม"
                className="w-1/2 border-2 border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex flex-row gap-4">
              <input
                type="text"
                placeholder="ผลการเรียนกลางภาค"
                className="w-full border-2 border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="bg-white shadow-md w-1/2 flex flex-col gap-4 mb-4 p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-left">
              คะแนนสอบปลายภาค
            </h2>
            <div className="flex flex-row gap-4">
              <input
                type="text"
                placeholder="คะแนนที่ได้"
                className="w-1/2 border-2 border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none transition-colors"
              />
              <span className="text-gray-500 text-lg text-center flex items-center justify-center">
                /
              </span>
              <input
                type="text"
                placeholder="คะแนนเต็ม"
                className="w-1/2 border-2 border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex flex-row gap-4">
              <input
                type="text"
                placeholder="ผลการเรียนปลายภาค"
                className="w-full border-2 border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
          </div>
          <button className="w-full bg-[#4a90e2] text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium">
            เพิ่มวิชา
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
