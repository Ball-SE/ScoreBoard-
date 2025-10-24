import { useEffect, useState } from 'react'
import { authService } from '../services/authService'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ตรวจสอบสถานะการ login เมื่อโหลดหน้า
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser()
        setUser(user)
      } catch (error) {
        console.error('Auth check error:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // ฟังการเปลี่ยนแปลงสถานะ auth
    const { data, error } = authService.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session?.user ?? null)
          // บันทึกข้อมูล user ใน localStorage
          if (session?.user) {
            localStorage.setItem('admin_user', JSON.stringify(session.user))
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          localStorage.removeItem('admin_user')
        }
        setLoading(false)
      }
    )

    if (error) {
      console.error('Auth state change error:', error)
    }

    return () => data.subscription.unsubscribe()
  }, [])

  const login = async (username, password) => {
    try {
      const { user } = await authService.login(username, password)
      if (user) {
        // บันทึก user ใน localStorage
        localStorage.setItem('admin_user', JSON.stringify(user))
        setUser(user)
      }
      return { user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  }

  const value = {
    user,
    loading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}