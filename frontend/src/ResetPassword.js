import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from './config';
import './App.css';

function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/password-reset-confirm/${uid}/${token}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_password: newPassword }),
      });

      if (response.ok) {
        setMessage('¡Contraseña actualizada! Redirigiendo al login...');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.detail || 'El enlace es inválido o expiró.'}`);
      }
    } catch (error) {
      setMessage('Error al conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Nueva Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nueva Contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength="8"
            />
          </div>
          <div className="form-group">
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="activity-button" disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Actualizar Contraseña'}
          </button>
        </form>
        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;