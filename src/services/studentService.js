import { supabase } from '../lib/supabase'

export const studentService = {
  // ดึงข้อมูลนักเรียนทั้งหมด
  async getAllStudents() {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // เพิ่มนักเรียนใหม่
  async addStudent(studentData) {
    const { data, error } = await supabase
      .from('students')
      .insert([studentData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // ค้นหานักเรียน
  async searchStudents(searchTerm) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,code.ilike.%${searchTerm}%`)
    
    if (error) throw error
    return data
  }
}