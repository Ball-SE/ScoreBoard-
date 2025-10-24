import TableScore from './TableScore';
import ShowStudent from './ShowStudent';
import { useState } from 'react';
import { students } from '../data/students';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [search, setSearch] = useState('');
  const [foundStudent, setFoundStudent] = useState(null);

  const navigate = useNavigate();

  const handleSearch = () => {
    // หา student ที่เลขบัตรตรงกับที่กรอก (หาได้หลายคน)
    const foundStudents = students.filter((s) => s.code === search.trim());
    if (foundStudents.length > 0) {
      setFoundStudent(foundStudents);
    } else {
      setFoundStudent('notfound');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full max-w-screen-lg mx-auto rounded-lg shadow-md">
        {/* Header */}
        <div className="flex flex-row items-center justify-between bg-[#4a90e2] px-6 py-4 rounded-t-lg">
          <h1 className="text-white text-[35px] font-bold text-center ml-65">
            ระบบแจ้งคะแนนสอบนักเรียน
          </h1>
          <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors font-bold"
          onClick={() => navigate('/admin-login')}
          >
            Admin Login
          </button>
        </div>

        {/* Main Content 1: ค้นหาผลการเรียน*/}
        <div className="flex flex-col justify-center items-center p-6">
          <div className="w-full max-w-lg">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                ค้นหาผลการเรียน
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    กรอกรหัสประจำตัว 13 หลัก
                  </label>
                  <input
                    type="text"
                    placeholder="x-xxxx-xxxxx-xx-x"
                    className="w-full border-2 border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none transition-colors"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button className="w-full bg-[#4a90e2] text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
                onClick={handleSearch}
                >
                  ค้นหา
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* แสดงผลตามที่ค้นเจอ */}
        {foundStudent && foundStudent !== 'notfound' && (
          <>
            {/* <ShowStudent student={foundStudent} /> */}
            <TableScore student={foundStudent} />
          </>
        )}
        {foundStudent === 'notfound' && (
          <div className="text-center text-red-500 font-bold mb-6">
            ไม่พบรหัสนักศึกษาในระบบ กรุณาตรวจสอบรหัสนักศึกษา
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-row items-center justify-center bg-gray-200 px-6 py-4 rounded-b-lg">
          <p className="text-gray-500 text-center">
            มหาวิทยาลัย...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Search;
