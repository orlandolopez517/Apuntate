import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CourseList from './CourseList';
import CourseDetail from './CourseDetail';
import MemoryGame from './MemoryGame'; // <-- ¡Importa el componente del juego de memoria!
import Register from './Register';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import './App.css'; // Tus estilos generales

function App() {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="nav-link">Cursos</Link>
          <Link to="/juego-memorizar" className="nav-link">Juego</Link>
          {!token ? (
            <>
              <Link to="/login" className="nav-link">Entrar</Link>
            </>
          ) : (
            <span className="nav-link" onClick={handleLogout} style={{cursor: 'pointer'}}>
              Cerrar Sesión ({username})
            </span>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/cursos/:id" element={<CourseDetail />} />
          <Route path="/juego-memorizar" element={<MemoryGame />} /> {/* <-- ¡La ruta del juego está de vuelta! */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
