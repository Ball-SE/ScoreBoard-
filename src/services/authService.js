import { supabase } from '../lib/supabase'
import bcrypt from 'bcryptjs'

export const authService = {
  // Login ด้วย username และ password จากตาราง admins
  async login(username, password) {
    try {
      // ค้นหา admin จากตาราง admins
      const { data: admin, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username)
        .single()
  
      if (error) {
        console.error('Supabase error:', error)
        throw new Error(`Database error: ${error.message}`)
      }
  
      if (!admin) {
        throw new Error('Admin not found')
      }
  
      // ตรวจสอบ password
      let isValidPassword = false
      
      if (admin.password_hash) {
        // ตรวจสอบว่าเป็น bcrypt hash หรือ plain text
        if (admin.password_hash.startsWith('$2b$') || admin.password_hash.startsWith('$2a$')) {
          // ถ้าเป็น bcrypt hash ใช้ bcrypt.compare()
          console.log('Using bcrypt comparison')
          isValidPassword = await bcrypt.compare(password, admin.password_hash)
        } else {
          // ถ้าเป็น plain text เปรียบเทียบตรงๆ
          console.log('Using direct comparison for plain text')
          isValidPassword = (admin.password_hash === password)
        }
      } else {
        // ถ้าไม่มี password_hash ให้เปรียบเทียบตรงๆ
        console.log('Using direct comparison')
        isValidPassword = (admin.password === password)
      }
  
      if (!isValidPassword) {
        throw new Error('Invalid password')
      }
  
      // สร้าง user object สำหรับ context
      return {
        user: {
          id: admin.id,
          username: admin.username,
          email: admin.username
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  // Logout - ลบข้อมูลจาก localStorage
  async logout() {
    localStorage.removeItem('admin_user')
    return { error: null }
  },

  // ตรวจสอบสถานะการ login จาก localStorage
  async getCurrentUser() {
    const user = localStorage.getItem('admin_user')
    return user ? JSON.parse(user) : null
  },

  // ฟังการเปลี่ยนแปลงสถานะ auth (ใช้ localStorage)
  onAuthStateChange(callback) {
    // ตรวจสอบ localStorage เมื่อโหลดหน้า
    const user = localStorage.getItem('admin_user')
    if (user) {
      callback('SIGNED_IN', { user: JSON.parse(user) })
    } else {
      callback('SIGNED_OUT', null)
    }

    // ฟังการเปลี่ยนแปลง localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'admin_user') {
        const user = e.newValue ? JSON.parse(e.newValue) : null
        callback(user ? 'SIGNED_IN' : 'SIGNED_OUT', user ? { user } : null)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return {
      data: {
        subscription: {
          unsubscribe: () => window.removeEventListener('storage', handleStorageChange)
        }
      }
    }
  }
}