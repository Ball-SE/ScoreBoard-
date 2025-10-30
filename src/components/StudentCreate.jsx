import StudentForm from '../components/StudentForm';
import { studentService } from '../services/studentService';

export default function StudentCreate() {
  const onSubmit = async (payload) => { await studentService.addStudent(payload); alert('เพิ่มสำเร็จ'); };
  return <StudentForm onSubmit={onSubmit} submitLabel="เพิ่มนักเรียน" />;
}