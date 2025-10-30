import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import Pagination from '../components/Pagination';
import { studentService } from '../services/studentService';
import { examService } from '../services/examService';

export default function StudentEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [stu, setStu] = useState(null);
    const [examRows, setExamRows] = useState([]);
    const [loadingExams, setLoadingExams] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
  
  const handleDelete = async (examId) => {
    if (!window.confirm('ยืนยันลบผลสอบรายการนี้?')) return;
    try {
      await examService.deleteExamResult(examId);
      setExamRows(prev => {
        const next = prev.filter(e => e.id !== examId);
        const totalPages = Math.max(1, Math.ceil(next.length / pageSize));
        setCurrentPage(p => Math.min(p, totalPages));
        return next;
      });
    } catch (e) {
      console.error(e);
      alert('ลบไม่สำเร็จ');
    }
  };
  
    // โหลดข้อมูลนักเรียนเฉพาะกรณีมี id และไม่ใช่ 'all'
    useEffect(() => { (async () => {
      if (!id || id === 'all') return;
      try {
        const one = await studentService.getById(id);
        setStu(one);
      } catch (e) {
        console.error(e);
      }
    })(); }, [id]);
  
    // โหลดผลสอบของทุกคน
    useEffect(() => { (async () => {
      try {
        setLoadingExams(true);
        const rows = await examService.getAllExamResults();
        setExamRows(rows ?? []);
        setCurrentPage(1);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingExams(false);
      }
    })(); }, []);

  const onSubmit = async (payload) => { await studentService.updateStudent(id, payload); alert('บันทึกแล้ว'); };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full max-w-screen-2xl mx-auto rounded-lg shadow-md">
        {/* Navbar/Header */}
        <div className="flex flex-row items-center justify-between bg-[#4a90e2] px-6 py-4 rounded-t-lg">
          <h1 className="text-white text-[35px] font-bold text-center ml-65">
            ระบบแจ้งคะแนนสอบนักเรียน
          </h1>
          <button
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors font-bold"
            onClick={() => navigate('/admin')}
          >
            Back
          </button>
        </div>

        {/* เนื้อหาแก้ไข */}
        <div className="p-6 bg-white">
          {/* แสดงฟอร์มเฉพาะกรณีมี id และไม่ใช่โหมด all */}
          {id && id !== 'all' ? (
            stu ? (
              <StudentForm initialValues={{ code: stu.code, name: stu.name, class: stu.class }} onSubmit={onSubmit} submitLabel="บันทึกการแก้ไข" />
            ) : (
              <div>กำลังโหลด...</div>
            )
          ) : null}

          <div style={{ marginTop: 24 }}>
            {loadingExams ? (
              <div>กำลังโหลดผลสอบ...</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1100 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: 8 }}>No.</th>
                      <th style={{ textAlign: 'left', padding: 8 }}>STUDENT ID</th>
                      <th style={{ textAlign: 'left', padding: 8 }}>NAME</th>
                      <th style={{ textAlign: 'right', padding: 8 }}>LISTENING</th>
                      <th style={{ textAlign: 'right', padding: 8 }}>READING</th>
                      <th style={{ textAlign: 'right', padding: 8 }}>WRITING</th>
                      <th style={{ textAlign: 'right', padding: 8 }}>TOTAL</th>
                      <th style={{ textAlign: 'right', padding: 8 }}>PASSING SCORE</th>
                      <th style={{ textAlign: 'right', padding: 8 }}>TEST LEVEL</th>
                      <th style={{ textAlign: 'right', padding: 8 }}>TEST CALENDAR</th>
                      <th style={{ textAlign: 'right', padding: 8 }}>NOTES</th>
                      <th style={{ textAlign: 'right', padding: 8 }}>SAVED BY</th>
                      <th style={{ textAlign: 'right', padding: 8 }}>STATUS</th>
                      <th style={{ textAlign: 'right', padding: 8 }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(examRows.slice((currentPage - 1) * pageSize, currentPage * pageSize)).map((r, idx) => {
                      const listening = r.listening ?? 0;
                      const reading = r.reading ?? 0;
                      const writing = r.writing ?? 0;
                      const total = r.total ?? (listening + reading + writing);
                      return (
                        <tr key={r.id}>
                          <td style={{ padding: 8 }}>{(currentPage - 1) * pageSize + idx + 1}</td>
                          <td style={{ padding: 8 }}>{r.students?.code ?? '-'}</td>
                          <td style={{ padding: 8 }}>{r.students?.name ?? '-'}</td>
                          <td style={{ padding: 8, textAlign: 'right' }}>{listening}</td>
                          <td style={{ padding: 8, textAlign: 'right' }}>{reading}</td>
                          <td style={{ padding: 8, textAlign: 'right' }}>{writing}</td>
                          <td style={{ padding: 8, textAlign: 'right' }}>{total}</td>
                          <td style={{ padding: 8, textAlign: 'right' }}>{r.passing_score ?? '-'}</td>
                          <td style={{ padding: 8, textAlign: 'right' }}>{r.test_level ?? '-'}</td>
                          <td style={{ padding: 8, textAlign: 'right' }}>{r.test_calendar ?? '-'}</td>
                          <td style={{ padding: 8, textAlign: 'right' }}>{r.notes ?? '-'}</td>
                          <td style={{ padding: 8, textAlign: 'right' }}>{r.saved_by ?? '-'}</td>
                          <td style={{ padding: 8, textAlign: 'right' }}>{r.status ?? '-'}</td>
                          <td style={{ padding: 8, textAlign: 'right' }}>
                            <button
                              onClick={() => navigate(`/admin/edit-course/${r.id}`)}
                              className="px-2 py-1 mr-2 border rounded hover:bg-gray-50"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(r.id)}
                              className="px-2 py-1 border border-red-300 text-red-600 rounded hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {examRows.length === 0 && (
                      <tr><td colSpan={14} style={{ padding: 12, textAlign: 'center' }}>ไม่พบข้อมูลผลสอบ</td></tr>
                    )}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-end">
                  <Pagination
                    currentPage={currentPage}
                    totalItems={examRows.length}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

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