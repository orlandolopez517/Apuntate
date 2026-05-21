import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from './config';
// Asegúrate de importar CourseCard si lo tienes en un archivo separado
// import CourseCard from './CourseCard'; 
import './App.css'; 

function CourseList() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const canvasRef = useRef(null);

  // Efecto para la animación de partículas (solo si no hay token)
  useEffect(() => {
    if (token) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 141, 153, 0.7)'; // Partículas en tono azul oscuro para resaltar sobre el verde
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      particles = Array.from({ length: particleCount }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(p.x - particles[j].x, p.y - particles[j].y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 141, 153, ${0.5 - dist / 120})`; // Líneas en tono azul oscuro con opacidad dinámica
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [token]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cursos/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setCursos(data);
        setLoading(false);
      })
  }, [token]);

  if (!token) {
    return (
      <div className="landing-container">
        <canvas ref={canvasRef} className="particle-canvas" />
        <div className="landing-hero">
          <div className="hero-text">
            <span className="hero-badge">Apuntate Online</span>
            <h1>Aprendizaje Moderno y <span>Experiencia Digital</span></h1>
            <p>
              Organiza tus apuntes, crea lecciones interactivas y domina cualquier tema 
              con nuestra plataforma diseñada para el éxito académico.
            </p>
            <div className="hero-buttons">
              <Link to="/login" className="btn-primary-landing">Iniciar Sesión</Link>
              <Link to="/register" className="btn-secondary-landing">Crear Cuenta</Link>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="illustration-wrapper">
              <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <circle cx="250" cy="250" r="200" fill="#f0f7ff" />
                {/* Lápiz */}
                <rect x="360" y="80" width="25" height="220" rx="4" fill="#ffd54f" transform="rotate(15 360 80)" />
                <path d="M360 80 L372.5 50 L385 80 Z" fill="#ffb74d" transform="rotate(15 360 80)" />
                {/* Regla */}
                <rect x="100" y="340" width="280" height="35" fill="#4dd0e1" opacity="0.9" />
                <path d="M110 340 v10 M140 340 v15 M170 340 v10 M200 340 v15 M230 340 v10 M260 340 v15 M290 340 v10 M320 340 v15 M350 340 v10" stroke="white" strokeWidth="2" />
                {/* Estudiante 1 */}
                <circle cx="190" cy="220" r="45" fill="#3b8d99" />
                <rect x="150" y="265" width="80" height="90" rx="15" fill="#1a5f7a" />
                {/* Estudiante 2 */}
                <circle cx="310" cy="240" r="40" fill="#ff8a65" />
                <rect x="275" y="280" width="70" height="75" rx="15" fill="#e57373" />
              </svg>
            </div>
          </div>
        </div>

        <div className="landing-footer-stats">
          <div className="stat-item"><strong>+100</strong><span>Cursos</span></div>
          <div className="stat-item"><strong>+500</strong><span>Estudiantes</span></div>
          <div className="stat-item"><strong>24/7</strong><span>Acceso</span></div>
        </div>
      </div>
    );
  }

  if (loading) return <p>Cargando cursos...</p>;

  return (
    // ¡Aquí se asegura que este div tenga la clase 'course-list-container'!
    <div>
      <div className="hero-section">
        <h1>Bienvenido a Apuntate</h1>
        <p>Repasa, aprende y domina tus temas con cuestionarios interactivos</p>
      </div>
      <div className="course-list-container"> 
        <h1>Tus Apuntes Disponibles</h1>
      <div className="course-grid">
        {cursos.map(curso => (
          <div key={curso.id} className="course-card">
            {/* Si tienes una imagen de curso, puedes usarla aquí */}
            {curso.imagen_url ? (
                <img src={curso.imagen_url} alt={curso.titulo} 
                     onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x180/3b8d99/ffffff?text=Apuntes"; }}/>
            ) : (
                <div className="course-image-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="60px" height="60px">
                        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
                    </svg>
                    <span>Apuntes</span>
                </div>
            )}
            <div className="course-card-content">
              <h2>{curso.titulo}</h2>
              <p>{curso.descripcion}</p>
              <Link to={`/cursos/${curso.id}`}>Ver Curso</Link>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default CourseList;
