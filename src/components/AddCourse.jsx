import { useState } from "react";
import { validateForm } from "../utils/validatefrom";
import { studentService } from '../services/studentService'
import { examService } from '../services/examService'
import { supabase } from '../lib/supabase'

function AddCourse() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [course, setCourse] = useState("");
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
  
      // หา course_id
      const { data: courses, error: courseError } = await supabase
      .from('courses')
      .select('id')
      .eq('name', newCourse.course)
      .single()

      if (courseError) {
        throw new Error(`ไม่พบรายวิชา: ${newCourse.course}`)
      }
  
      // บันทึกผลสอบ
      await examService.addExamResult({
        student_id: studentId,
        course_id: courses.id,
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
  
      alert('บันทึกข้อมูลสำเร็จ!')
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
      alert('เกิดข้อผิดพลาด: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-4xl">
        <form className="bg-white rounded-xl shadow-lg p-8 w-full" onSubmit={handleAddCourse}>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รหัสประจำตัวประชาชน
                </label>
                <input
                  type="text"
                  placeholder="กรอกรหัสประจำตัวประชาชน"
                  className="w-full border-2 border-gray-200 rounded-lg p-4 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
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
              <input
                type="text"
                placeholder="กรอกรายวิชา"
                className="w-full border-2 border-gray-200 rounded-lg p-4 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                onChange={(e) => setCourse(e.target.value)}
              />
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
                    type="text"
                    placeholder="กรอกคะแนน Listening"
                    className="flex-1 border-2 bg-white border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                    onChange={(e) => setListening(e.target.value)}
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
                    type="text"
                    placeholder="กรอกคะแนน Reading"
                    className="flex-1 border-2 bg-white border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                    onChange={(e) => setReading(e.target.value)}
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
                    type="text"
                    placeholder="กรอกคะแนน Writing"
                    className="flex-1 border-2 bg-white border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                    onChange={(e) => setWriting(e.target.value)}
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
                    onChange={(e) => setTotal(e.target.value)}
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
                    type="text"
                    placeholder="กรอกคะแนนผ่าน"
                    className="flex-1 border-2 bg-white border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                    onChange={(e) => setPassingScore(e.target.value)}
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
                  <input
                    type="text"
                    placeholder="ผ่าน/ไม่ผ่าน"
                    className="flex-1 border-2 bg-white border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  {error.status && <p className="text-red-500 text-sm">{error.status}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5" >
              เพิ่มคะแนน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
