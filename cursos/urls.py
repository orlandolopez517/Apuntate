from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import (
    CursoList, # Vista para listar/crear cursos
    CursoDetail, # Vista para detalle de curso
    LeccionFlashcardsList, # Vista para flashcards de una lección
    FlashcardList, # Vista para todas las flashcards
    LeccionQuizQuestionsList, # ¡Vista para las preguntas del quiz!
    UserCreate # Nueva vista de registro
)

urlpatterns = [
    # Rutas para Cursos
    path('cursos/', CursoList.as_view(), name='curso-list'),
    path('cursos/<int:pk>/', CursoDetail.as_view(), name='curso-detail'),
    
    # Rutas para Flashcards y Lecciones (aunque LeccionList y LeccionDetail no están aquí, se asume que existen o se manejarán de otra forma)
    path('lecciones/<int:leccion_id>/flashcards/', LeccionFlashcardsList.as_view(), name='leccion-flashcards-list'),
    path('flashcards/', FlashcardList.as_view(), name='flashcard-list'), # Ruta para todas las flashcards
    
    # --- NUEVA RUTA PARA EL MINI-CUESTIONARIO ---
    # Esta ruta permitirá a tu frontend solicitar las preguntas de quiz para una lección específica.
    path('lecciones/<int:leccion_id>/quiz_questions/', LeccionQuizQuestionsList.as_view(), name='leccion-quiz-questions-list'),

    # --- RUTA PARA REGISTRO DE USUARIOS ---
    path('register/', UserCreate.as_view(), name='user-register'),

    # --- RUTA PARA LOGIN (Obtener Token) ---
    path('login/', obtain_auth_token, name='api-token-auth'),
]
