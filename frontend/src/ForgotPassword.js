import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from './config';
import './App.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      // Este endpoint debe ser habilitado en el backend (Django)
      const response = await fetch(`${API_BASE_URL}/api/password-reset/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Si el correo está registrado, recibirás un enlace de recuperación en breve.');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.detail || 'No se pudo procesar la solicitud.'}`);
      }
    } catch (error) {
      console.error('Error en recuperación:', error);
      setMessage('Error al conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Recuperar Contraseña</h2>
        <p style={{ marginBottom: '20px', color: '#555', fontSize: '0.9em' }}>
          Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu cuenta.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="activity-button" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar Instrucciones'}
          </button>
        </form>
        {message && <p className="auth-message">{message}</p>}
        <p style={{ marginTop: '20px' }}>
          <Link to="/login">Volver al inicio de sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;