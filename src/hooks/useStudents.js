import { useState, useEffect } from 'react'
import { studentService } from '../services/studentService'

export const useStudents = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const data = await studentService.getAllStudents()
      setStudents(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const searchStudents = async (searchTerm) => {
    setLoading(true)
    try {
      const data = await studentService.searchStudents(searchTerm)
      setStudents(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return {
    students,
    loading,
    error,
    fetchStudents,
    searchStudents
  }
}