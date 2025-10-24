import { supabase } from '../lib/supabase'

export const examService = {
  // ดึงข้อมูลผลสอบทั้งหมด
  async getAllExamResults() {
    const { data, error } = await supabase
      .from('exam_results')
      .select(`
        *,
        students(name, code, class),
        courses(name)
      `)
      .order('test_calendar', { ascending: false })
    
    if (error) throw error
    return data
  },

  // เพิ่มผลสอบใหม่
  async addExamResult(examData) {
    const { data, error } = await supabase
      .from('exam_results')
      .insert([examData])
      .select(`
        *,
        students(name, code, class),
        courses(name)
      `)
    
    if (error) throw error
    return data[0]
  },

  // ค้นหาผลสอบตามเงื่อนไข
  async searchExamResults(filters) {
    let query = supabase
      .from('exam_results')
      .select(`
        *,
        students(name, code, class),
        courses(name)
      `)

    if (filters.studentId) {
      query = query.eq('student_id', filters.studentId)
    }
    if (filters.courseId) {
      query = query.eq('course_id', filters.courseId)
    }
    if (filters.status) {
      query = query.eq('status', filters.status)
    }
    if (filters.testLevel) {
      query = query.eq('test_level', filters.testLevel)
    }

    const { data, error } = await query.order('test_calendar', { ascending: false })
    
    if (error) throw error
    return data
  }
}