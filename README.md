# 📚 Apuntate - Tu Plataforma de Repaso Digital

Una plataforma intuitiva para guardar, organizar y repasar tus apuntes de estudio con herramientas interactivas. Convierte tus notas en sesiones de repaso dinámicas con cuestionarios y juegos de memoria para aprender mejor.

## 🎯 ¿Para qué sirve?

- 📝 **Guardar Apuntes**: Crea temas con notas detalladas en editor rico
- ✅ **Cuestionarios de Repaso**: Genera preguntas automáticas sobre tu contenido
- 🎮 **Juegos de Memoria**: Práctica interactiva con flashcards
- 📱 **Acceso Desde Cualquier Lugar**: Tu plataforma en la nube, siempre disponible
- 🎨 **Interfaz Limpia**: Enfocada en el estudio, sin distracciones

**Ideal para**: Estudiantes, profesionales en formación, autodidactas que quieren organizar su conocimiento de forma interactiva.

## 💡 Casos de Uso

- 🎓 Estudiantes preparando exámenes
- 👨‍💼 Profesionales aprendiendo nuevas habilidades
- 🏫 Docentes creando material de repaso para estudiantes
- 📚 Personas estudiando idiomas o nuevos temas

## 🛠️ Tech Stack

### Backend
- **Django 5.2** - Framework web robusto
- **Django Rest Framework** - API REST para sincronizar datos
- **PostgreSQL** - Base de datos en la nube
- **Gunicorn** - Servidor WSGI optimizado

### Frontend
- **React 18** - Interfaz rápida y responsiva
- **React Router** - Navegación fluida
- **CSS3** - Diseño limpio enfocado en lectura

### DevOps
- **Render** - Hosting en la nube (gratis)
- **WhiteNoise** - Servir contenido estático
- **GitHub** - Control de versiones

## 🚀 Inicio Rápido

### Instalación Local

1. **Clonar repositorio**
```bash
git clone https://github.com/tu-usuario/Cursos_Gratuitos.git
cd Cursos_Gratuitos
```

2. **Backend (Python)**
```bash
# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Ejecutar servidor
python manage.py runserver
```

3. **Frontend (Node.js)**
```bash
cd frontend
npm install
npm start
```

La app estará disponible en:
- Frontend: http://localhost:3000
- Admin: http://localhost:8000/admin
- API: http://localhost:8000/api

---

## 📦 Despliegue en Render

Para desplegar la aplicación en la nube (gratis), sigue la guía completa:

**👉 [Leer DESPLIEGUE_RENDER.md](./DESPLIEGUE_RENDER.md)**

### Resumen rápido:
1. Crea una BD PostgreSQL en Render
2. Crea un Web Service conectado a tu GitHub
3. Configura variables de entorno (SECRET_KEY, DATABASE_URL, etc.)
4. ¡Listo! Tu app estará en línea

---

## 📁 Estructura del Proyecto

```
├── core/                    # Configuración Django
│   ├── settings.py         # Config principal y seguridad
│   ├── urls.py             # Rutas (admin, api, frontend)
│   └── wsgi.py             # Entrypoint Gunicorn
├── cursos/                  # App principal (Temas de estudio)
│   ├── models.py           # Tema, Lección, Preguntas, Flashcards
│   ├── serializers.py      # Convertir datos a JSON
│   ├── views.py            # Lógica de API REST
│   └── urls.py             # Rutas de API
├── frontend/               # React - Interfaz de usuario
│   ├── public/
│   └── src/
│       ├── App.js          # Componente principal
│       ├── CourseList.js   # Listado de temas
│       ├── CourseDetail.js # Detalle y repaso del tema
│       ├── MemoryGame.js   # Juego de memoria
│       └── config.js       # Config de API
├── build.sh                # Script auto-deploy
├── requirements.txt        # Dependencias Python
├── manage.py               # CLI Django
└── DESPLIEGUE_RENDER.md    # Guía paso a paso
```

---

## 🔐 Seguridad

⚠️ **Importante**: 
- Nunca subas `.env` o `SECRET_KEY` a GitHub
- Usa variables de entorno en producción
- Mantén `DEBUG = False` en producción
- Cambiar contraseña de admin regularmente

Ver [DESPLIEGUE_RENDER.md](./DESPLIEGUE_RENDER.md) para más detalles de seguridad.

---
 Principales

### Temas de Estudio
- `GET /api/cursos/` - Listar todos tus temas
- `GET /api/cursos/{id}/` - Ver tema con lecciones

### Lecciones (Apuntes)
- `GET /api/lecciones/{id}/quiz_questions/` - Preguntas de repaso

### Flashcards (Juego de Memoria)
- `GET /api/flashcards/` - Obtener tarjetas para practicar
- `GET /api/flashcards/` - Obtener todas las tarjetas

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo licencia [MIT](./LICENSE)

---

## 💬 Soporte

¿Problemas con el despliegue? 
- Revisa [DESPLIEGUE_RENDER.md](./DESPLIEGUE_RENDER.md)
- Abre un issue en GitHub
- Verifica los logs en Render Dashboard

---

## 🎓 Próximas Mejoras

- [ ] Autenticación de usuarios (tus apuntes privados)
- [ ] Exportar apuntes a PDF
- [ ] Sistema de etiquetas y búsqueda avanzada
- [ ] Estadísticas de repaso (cuánto estudiaste)
- [ ] Compartir apuntes con compañeros
- [ ] Integración con Cloudinary para imágenes
- [ ] Sincronización offline
- [ ] Modo oscuro

---estudiar mejor y recordar más

**Hecho con ❤️ para facilitar el aprendizaje en línea**
