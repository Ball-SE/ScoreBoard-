import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { validateForm } from "../utils/validatefrom";
import { studentService } from '../services/studentService'
import { examService } from '../services/examService'
import { courseService } from '../services/courseService'
import Toast from './Toast'

function EditCourse() {
  const navigate = useNavigate();
  const params = useParams();
  const examIdProp = params.examId || undefined;
  const [, setLoadingInitial] = useState(true);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]); // เพิ่ม state สำหรับเก็บรายการ courses
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [listening, setListening] = useState("");
  const [reading, setReading] = useState("");
  const [writing, setWriting] = useState("");
  const [total, setTotal] = useState("");
  const [passingScore, setPassingScore] = useState("");
  const [testLevel, setTestLevel] = useState("");
  const [testCalendar, setTestCalendar] = useState("");
  const [notes, setNotes] = useState("");
  const [savedBy, setSavedBy] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState({})
  const [toast, setToast] = useState({ open: false, type: 'success', message: '' })
  const showToast = (type, message) => setToast({ open: true, type, message })

  // ดึงข้อมูล courses เมื่อ component โหลด
  useEffect(() => {
    let mounted = true
  
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCourses()
        if (mounted) setCourses(data)
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        if (mounted) setLoadingCourses(false)
      }
    }
  
    fetchCourses()
    return () => { mounted = false }
  }, [])

  // เติมค่าฟอร์มจากไฟล์ที่นำเข้า (ถ้ามี) หรือจากแถวที่ต้องการแก้ไข
  useEffect(() => {
    const draftStr = localStorage.getItem('addCourseDraft')
    if (draftStr) {
      try {
        const d = JSON.parse(draftStr)
        setCode(d.code || '')
        setName(d.name || '')
        setClassLevel(d.classLevel || '')
        setCourse(d.course || '')
        setListening(d.listening !== undefined ? String(d.listening) : '')
        setReading(d.reading !== undefined ? String(d.reading) : '')
        setWriting(d.writing !== undefined ? String(d.writing) : '')
        setTotal(d.total !== undefined ? String(d.total) : '')
        setPassingScore(d.passingScore !== undefined ? String(d.passingScore) : '')
        setTestLevel(d.testLevel || '')
        setTestCalendar(d.testCalendar || '')
        setNotes(d.notes || '')
        setSavedBy(d.savedBy || '')
        setStatus(d.status || '')
      } catch (e) {
        console.error(e)
      }
      localStorage.removeItem('addCourseDraft')
      setLoadingInitial(false)
      return
    }

    // ถ้ามีพารามิเตอร์ examId ให้โหลดข้อมูลจากฐานข้อมูล
    const loadFromExam = async () => {
      if (!examIdProp) { setLoadingInitial(false); return }
      try {
        const row = await examService.getExamById(examIdProp)
        setCode(row.students?.code || '')
        setName(row.students?.name || '')
        setClassLevel(row.students?.class || '')
        setCourse(row.course_id ? String(row.course_id) : '')
        setListening(row.listening !== undefined ? String(row.listening) : '')
        setReading(row.reading !== undefined ? String(row.reading) : '')
        setWriting(row.writing !== undefined ? String(row.writing) : '')
        setTotal(row.total !== undefined ? String(row.total) : '')
        setPassingScore(row.passing_score !== undefined ? String(row.passing_score) : '')
        setTestLevel(row.test_level || '')
        setTestCalendar(row.test_calendar || '')
        setNotes(row.notes || '')
        setSavedBy(row.saved_by || '')
        setStatus(row.status || '')
      } catch (e) {
        console.error('load exam error', e)
      } finally {
        setLoadingInitial(false)
      }
    }
    loadFromExam()
  }, [examIdProp])

  // คำนวณคะแนนรวมอัตโนมัติจาก Listening + Reading + Writing
  useEffect(() => {
    const l = parseInt(listening, 10)
    const r = parseInt(reading, 10)
    const w = parseInt(writing, 10)

    const safeL = isNaN(l) ? 0 : l
    const safeR = isNaN(r) ? 0 : r
    const safeW = isNaN(w) ? 0 : w

    const sum = safeL + safeR + safeW

    if (
      (listening === "" || isNaN(l)) &&
      (reading === "" || isNaN(r)) &&
      (writing === "" || isNaN(w))
    ) {
      setTotal("")
    } else {
      setTotal(String(sum))
    }
  }, [listening, reading, writing])

  const handleAddCourse = async (e) => {
    e.preventDefault()
  
    const newCourse = {
      code: code.trim(),
      name: name.trim(),
      classLevel: classLevel.trim(),
      course: course.trim(),
      listening: parseInt(listening),
      reading: parseInt(reading),
      writing: parseInt(writing),
      total: parseInt(total),
      passingScore: parseInt(passingScore),
      testLevel: testLevel.trim(),
      testCalendar: testCalendar.trim(),
      notes: notes.trim(),
      savedBy: savedBy.trim(),
      status: status.trim(),
    }
  
    if (validateForm(newCourse, setError)) {
      return
    }
  
    try {
      // ตรวจสอบว่านักเรียนมีอยู่แล้วหรือไม่
      const existingStudent = await studentService.searchStudents(newCourse.code)
      
      let studentId
      if (existingStudent.length > 0) {
        studentId = existingStudent[0].id
      } else {
        // สร้างนักเรียนใหม่
        const newStudent = await studentService.addStudent({
          code: newCourse.code,
          name: newCourse.name,
          class: newCourse.classLevel
        })
        studentId = newStudent.id
      }
  
      const courseId = parseInt(newCourse.course)
      if (!courseId) {
        throw new Error('กรุณาเลือกรายวิชา')
      }
  
      if (examIdProp) {
        // อัปเดตผลสอบเดิม
        await examService.updateExamResult(examIdProp, {
          course_id: courseId,
          listening: newCourse.listening,
          reading: newCourse.reading,
          writing: newCourse.writing,
          total: newCourse.total,
          passing_score: newCourse.passingScore,
          test_level: newCourse.testLevel,
          test_calendar: newCourse.testCalendar,
          notes: newCourse.notes,
          saved_by: newCourse.savedBy,
          status: newCourse.status
        })
      } else {
        // บันทึกผลสอบใหม่
        await examService.addExamResult({
          student_id: studentId,
          course_id: courseId,
          listening: newCourse.listening,
          reading: newCourse.reading,
          writing: newCourse.writing,
          total: newCourse.total,
          passing_score: newCourse.passingScore,
          test_level: newCourse.testLevel,
          test_calendar: newCourse.testCalendar,
          notes: newCourse.notes,
          saved_by: newCourse.savedBy,
          status: newCourse.status
        })
      }
  
      showToast('success', 'บันทึกข้อมูลสำเร็จ!')
      if (examIdProp) {
        setTimeout(() => navigate('/admin/edit/all'), 500)
        return
      }
      // รีเซ็ตฟอร์ม
      setCode('')
      setName('')
      setClassLevel('')
      setCourse('')
      setListening('')
      setReading('')
      setWriting('')
      setTotal('')
      setPassingScore('')
      setTestLevel('')
      setTestCalendar('')
      setNotes('')
      setSavedBy('')
      setStatus('')
      setError({})
    } catch (error) {
      console.error('Error:', error)
      showToast('error', 'เกิดข้อผิดพลาด: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-4xl">
        <form className="bg-white rounded-xl shadow-lg p-8 w-full" onSubmit={handleAddCourse}>
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {examIdProp ? 'แก้ไขข้อมูลรายวิชา' : 'เพิ่มข้อมูลรายวิชา'}
            </h2>
            <p className="text-gray-600">กรอกข้อมูลนักเรียนและรายวิชา</p>
          </div>

          {/* Student Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              ข้อมูลนักเรียน
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รหัสประจำตัวประชาชน
                </label>
                <input
                  type="text"
                  placeholder="กรอกรหัสประจำตัวประชาชน"
                  className="w-full border-2 border-gray-200 rounded-lg p-4 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                {error.code && <p className="text-red-500 text-sm mt-1">{error.code}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อ-นามสกุล
                </label>
                <input
                  type="text"
                  placeholder="กรอกชื่อ-นามสกุล"
                  className="w-full border-2 border-gray-200 rounded-lg p-4 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ระดับชั้น
                </label>
                <input
                  type="text"
                  placeholder="กรอกระดับชั้น"
                  className="w-full border-2 border-gray-200 rounded-lg p-4 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                />
                {error.classLevel && <p className="text-red-500 text-sm mt-1">{error.classLevel}</p>}
              </div>
            </div>
          </div>

          {/* Course Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              ข้อมูลรายวิชา
            </h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รายวิชา
              </label>
              <div className="relative">
                <select
                  className="w-full border-2 border-gray-200 rounded-lg p-4 pr-10 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300 appearance-none"
                  onChange={(e) => setCourse(e.target.value)}
                  value={course}
                  disabled={loadingCourses}
                >
                  <option value="">{loadingCourses ? 'กำลังโหลด...' : 'เลือกรายวิชา'}</option>
                  {courses.map((courseItem) => (
                    <option key={courseItem.id} value={courseItem.id}>
                      {courseItem.name}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5.25 7.5l4.75 4.75L14.75 7.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              {error.course && <p className="text-red-500 text-sm mt-1">{error.course}</p>}
            </div>
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
                    type="number"
                    min={0}
                    max={100}
                    placeholder="กรอกคะแนน Listening"
                    className="flex-1 border-2 bg-white border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                    value={listening}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "") return setListening("");
                      const n = Number(v);
                      setListening(String(Math.max(0, Math.min(100, n))));
                    }}
                  />
                  {error.listening && <p className="text-red-500 text-sm mt-1">{error.listening}</p>}
                </div>

                {/* Reading (100) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                    Reading (100)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="กรอกคะแนน Reading"
                    className="flex-1 border-2 bg-white border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                    value={reading}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "") return setReading("");
                      const n = Number(v);
                      setReading(String(Math.max(0, Math.min(100, n))));
                    }}
                  />
                  {error.reading && <p className="text-red-500 text-sm mt-1">{error.reading}</p>}
                </div>

                {/* Writing (100) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-purple-400 rounded-full mr-2"></span>
                    Writing (100)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="กรอกคะแนน Writing"
                    className="flex-1 border-2 bg-white border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                    value={writing}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "") return setWriting("");
                      const n = Number(v);
                      setWriting(String(Math.max(0, Math.min(100, n))));
                    }}
                  />
                  {error.writing && <p className="text-red-500 text-sm mt-1">{error.writing}</p>}
                </div>

                {/* Total (300) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-orange-400 rounded-full mr-2"></span>
                    Total (300)
                  </label>
                  <input
                    type="text"
                    placeholder="กรอกคะแนนรวม"
                    className="flex-1 border-2 bg-white border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                    value={total}
                    readOnly
                  />
                  {error.total && <p className="text-red-500 text-sm mt-1">{error.total}</p>}
                </div>

                {/* Passing Score (180) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
                    Passing Score (180)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={180}
                    placeholder="กรอกคะแนนผ่าน"
                    className="flex-1 border-2 bg-white border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                    value={passingScore}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "") return setPassingScore("");
                      const n = Number(v);
                      setPassingScore(String(Math.max(0, Math.min(180, n))));
                    }}
                  />
                  {error.passingScore && <p className="text-red-500 text-sm mt-1">{error.passingScore}</p>}
                </div>

                {/* Test Level */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    Test Level
                  </label>
                  <input
                    type="text"
                    placeholder="Input Text"
                    className="flex-1 border-2 bg-white border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                    value={testLevel}
                    onChange={(e) => setTestLevel(e.target.value)}
                  />
                  {error.testLevel && <p className="text-red-500 text-sm">{error.testLevel}</p>}
                </div>

                {/* Test Calendar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    Test Calendar
                  </label>
                  <input
                    type="date"
                    placeholder="วัน/เดือน/ปี"
                    className="flex-1 border-2 bg-white border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                    value={testCalendar}
                    onChange={(e) => setTestCalendar(e.target.value)}
                  />
                  {error.testCalendar && <p className="text-red-500 text-sm">{error.testCalendar}</p>}
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
                    className="flex-1 border-2 bg-white border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  {error.notes && <p className="text-red-500 text-sm">{error.notes}</p>}
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
                    className="flex-1 border-2 bg-white border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                    value={savedBy}
                    onChange={(e) => setSavedBy(e.target.value)}
                  />
                  {error.savedBy && <p className="text-red-500 text-sm">{error.savedBy}</p>}
                </div>

                {/* Status */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-gray-700 font-medium min-w-[140px] flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    Status
                  </label>
                  <div className="relative flex-1">
                    <select
                      className="w-full border-2 bg-white border-gray-200 rounded-lg p-3 pr-10 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300 appearance-none"
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                    >
                      <option value="">เลือกสถานะ</option>
                      <option value="PASS">ผ่าน</option>
                      <option value="NOT PASS">ไม่ผ่าน</option>
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5.25 7.5l4.75 4.75L14.75 7.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                  {error.status && <p className="text-red-500 text-sm">{error.status}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5" >
              {examIdProp ? 'บันทึกการแก้ไข' : 'เพิ่มคะแนน'}
            </button>
          </div>
        </form>
      </div>
      <Toast
        open={toast.open}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast(t => ({ ...t, open: false }))}
      />
    </div>
  );
}

export default EditCourse;
