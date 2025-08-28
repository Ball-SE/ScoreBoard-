function ShowStudent({student}) {
  // หานักเรียนที่มีชื่อซ้ำกัน (แสดงแค่ชื่อเดียว)
  const duplicateNames = student.filter((currentStudent, index, array) => {
    return array.findIndex(s => s.name === currentStudent.name) !== index;
  });

  // เอาแค่ชื่อที่ไม่ซ้ำกัน
  const uniqueDuplicateNames = duplicateNames.filter((currentStudent, index, array) => {
    return array.findIndex(s => s.name === currentStudent.name) === index;
  });

  return (
    <div className="flex flex-col justify-center items-center p-6">
      {uniqueDuplicateNames.map((student, index) => (
        <div className="w-full max-w-lg" key={student.id + "-" + index}>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              แสดงชื่อนักศึกษา
            </h2>
            <p className="text-gray-500 text-center">Student ID : {student.code}</p>
            <p className="text-gray-500 text-center">
              Name : {student.name}
            </p>
            <p className="text-gray-500 text-center">Class : {student.class}</p>
            <p className="text-gray-500 text-center">Subject : {student.course}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ShowStudent;
