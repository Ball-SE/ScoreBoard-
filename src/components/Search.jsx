import TableScore from './TableScore';
import ShowStudent from './ShowStudent';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

function Search() {
  const [search, setSearch] = useState('');
  const [foundStudent, setFoundStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!search.trim()) return;
    
    setLoading(true);
    try {
      // ค้นหานักเรียนที่มี code ตรงกับที่กรอก
      const { data: students, error: studentError } = await supabase
        .from('students')
        .select('*')
        .eq('code', search.trim());
      
      if (studentError) throw studentError;
      
      if (students.length > 0) {
        // ดึงผลสอบของนักเรียนเหล่านี้
        const studentIds = students.map(s => s.id);
        const { data: examResults, error: examError } = await supabase
          .from('exam_results')
          .select(`
            *,
            students(name, code, class),
            courses(name)
          `)
          .in('student_id', studentIds)
          .order('test_calendar', { ascending: false });
        
        if (examError) throw examError;
        
        // จัดรูปแบบข้อมูลให้เหมือนกับโครงสร้างเดิมที่ TableScore ใช้
        const formattedData = students.map(student => {
          const studentExams = examResults.filter(exam => exam.student_id === student.id);
          return {
            id: student.id,
            code: student.code,
            name: student.name,
            class: student.class,
            scores: studentExams.map(exam => ({
              listening: exam.listening,
              reading: exam.reading,
              writing: exam.writing,
              total: exam.total,
              passing: exam.passing_score,
              testLevel: exam.test_level,
              testCalendar: exam.test_calendar,
              notes: exam.notes,
              savedBy: exam.saved_by,
              status: exam.status
            }))
          };
        });
        
        setFoundStudent(formattedData);
      } else {
        setFoundStudent('notfound');
      }
    } catch (error) {
      console.error('Error searching students:', error);
      setFoundStudent('error');
    } finally {
      setLoading(false);
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
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <button 
                  className="w-full bg-[#4a90e2] text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium disabled:opacity-50"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? 'กำลังค้นหา...' : 'ค้นหา'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* แสดงผลตามที่ค้นเจอ */}
        {foundStudent && foundStudent !== 'notfound' && foundStudent !== 'error' && (
          <>
            <TableScore student={foundStudent} />
          </>
        )}
        {foundStudent === 'notfound' && (
          <div className="text-center text-red-500 font-bold mb-6">
            ไม่พบรหัสนักศึกษาในระบบ กรุณาตรวจสอบรหัสนักศึกษา
          </div>
        )}
        {foundStudent === 'error' && (
          <div className="text-center text-red-500 font-bold mb-6">
            เกิดข้อผิดพลาดในการค้นหา กรุณาลองใหม่อีกครั้ง
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