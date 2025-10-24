import { supabase } from '../lib/supabase'

export const testSupabaseConnection = async () => {
  try {
    const { error } = await supabase
      .from('students')
      .select('count')
      .limit(1)
    
    if (error) throw error
    
    console.log('✅ Supabase connection successful!')
    return true
  } catch (error) {
    console.error('❌ Supabase connection failed:', error)
    return false
  }
}