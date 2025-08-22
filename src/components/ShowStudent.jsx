function ShowStudent({student}) {
  return (
    <div className="flex flex-col justify-center items-center p-6">
      {student.map((student,index) => (
      <div className="w-full max-w-lg" key={index}>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            แสดงชื่อนักเรียน
          </h2>
          <p className="text-gray-500 text-center">รหัส: {student.code}</p>
          <p className="text-gray-500 text-center">
            ชื่อนักเรียน: {student.name}
          </p>
          <p className="text-gray-500 text-center">ชั้นปี: {student.class}</p>
        </div>
      </div>
      ))}
    </div>
  );
}
export default ShowStudent;
