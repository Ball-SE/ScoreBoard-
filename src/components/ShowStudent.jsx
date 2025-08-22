function ShowStudent() {
  return (
    <div className="flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            แสดงชื่อนักเรียน
          </h2>
          <p className="text-gray-500 text-center">รหัส: 1234567890123</p>
          <p className="text-gray-500 text-center">
            ชื่อนักเรียน: นาย อัศวิน มาพูล
          </p>
          <p className="text-gray-500 text-center">ชั้นปี: 3</p>
        </div>
      </div>
    </div>
  );
}
export default ShowStudent;
