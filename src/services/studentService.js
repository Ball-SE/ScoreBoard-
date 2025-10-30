import { supabase } from '../lib/supabase'

export const studentService = {
  async getAllStudents() {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async addStudent(studentData) {
    const { data, error } = await supabase
      .from('students')
      .insert([studentData])
      .select()
    if (error) throw error
    return data[0]
  },

  async searchStudents(searchTerm) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,code.ilike.%${searchTerm}%`)
    if (error) throw error
    return data
  },

  async updateStudent(id, payload) {
    const { data, error } = await supabase
      .from('students')
      .update(payload)
      .eq('id', id)
      .select()
    if (error) throw error
    return data?.[0]
  },

  // ลบนักเรียน
  async deleteStudent(id) {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id)
    if (error) throw error
    return true
  }
}