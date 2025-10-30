import { supabase } from '../lib/supabase'

export const courseService = {
  async getAllCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('id, name')
      .order('name', { ascending: true })

    if (error) throw error
    return data || []
  },
}