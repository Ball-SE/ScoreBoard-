import './App.css'
import Search from './components/Search'
import Admin from './pages/Admin'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
