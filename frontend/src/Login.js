import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from './config';
import './App.css';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Guardamos el token en localStorage para usarlo en futuras peticiones
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', formData.username);
        setMessage('¡Bienvenido! Redirigiendo...');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMessage('Error: Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setMessage('Ocurrió un error al conectar con el servidor.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? (
                  <span role="img" aria-label="hide">👁️‍🗨️</span>
                ) : (
                  <span role="img" aria-label="show">👁️</span>
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="activity-button">Entrar</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
        <p style={{marginTop: '15px'}}>
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;