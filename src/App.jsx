import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import './App.css';
import Search from './components/Search';
import StudentEdit from './components/StudentEdit';
import AdminEdit from './pages/AdminEdit';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/edit" element={<StudentEdit />} />
          <Route path="/admin/edit/:id" element={<StudentEdit />} />
          <Route path="/admin/edit-course/:examId" element={<AdminEdit />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;