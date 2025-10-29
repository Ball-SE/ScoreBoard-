import { supabase } from '../lib/supabase'

export const authService = {
  // Login ด้วย Supabase Auth
  async login(username, password) {
    try {
      // ค้นหา admin จากตาราง admins
      const { data: admin, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username)
        .single()

      if (error || !admin) {
        throw new Error('Admin not found')
      }

      // ตรวจสอบ password
      let isValidPassword = false
      
      if (admin.password_hash) {
        if (admin.password_hash.startsWith('$2b$') || admin.password_hash.startsWith('$2a$')) {
          const bcrypt = await import('bcryptjs')
          isValidPassword = await bcrypt.compare(password, admin.password_hash)
        } else {
          isValidPassword = (admin.password_hash === password)
        }
      } else {
        isValidPassword = (admin.password === password)
      }

      if (!isValidPassword) {
        throw new Error('Invalid password')
      }

      // ถ้า admin มี user_id ให้ sign in ด้วย Supabase Auth
      if (admin.user_id) {
        // ใช้ email/password ของ Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: admin.username, // หรือ email ถ้ามี
          password: password // หรือใช้ password แยกต่างหาก
        })

        if (authError) {
          throw new Error('Authentication failed')
        }

        return authData
      } else {
        throw new Error('Admin not linked to Supabase Auth')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  // Logout
  async logout() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // ตรวจสอบสถานะการ login
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // ฟังการเปลี่ยนแปลงสถานะ auth
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}