from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.conf import settings
from .serializers import PasswordResetRequestSerializer, PasswordResetConfirmSerializer

class PasswordResetRequestView(APIView):
    permission_classes = [] # Permitir acceso sin estar logueado

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.filter(email=email).first()
            
            # Por seguridad, siempre respondemos "ok" aunque el usuario no exista
            # para evitar que atacantes adivinen qué correos están registrados.
            if user:
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                
                # En producción, esto debería apuntar a tu URL de React
                reset_url = f"http://localhost:3000/reset-password/{uid}/{token}/"
                
                subject = "Recuperación de contraseña - Apuntate"
                message = f"Hola {user.username},\n\nPara restablecer tu contraseña, haz clic en el siguiente enlace:\n{reset_url}"
                
                try:
                    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email])
                except Exception as e:
                    # Si falla el envío (por falta de configuración SMTP), lo logueamos
                    print(f"Error enviando correo: {e}")
                    print(f"DEBUG: El enlace de recuperación es: {reset_url}")
            
            return Response({"detail": "Si el correo está registrado, recibirás un mensaje con instrucciones."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(APIView):
    permission_classes = []

    def post(self, request, uidb64, token):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            try:
                # Decodificar el ID del usuario
                uid = force_str(urlsafe_base64_decode(uidb64))
                user = User.objects.get(pk=uid)
            except (TypeError, ValueError, OverflowError, User.DoesNotExist):
                user = None

            # Verificar si el token es válido para este usuario
            if user is not None and default_token_generator.check_token(user, token):
                user.set_password(serializer.validated_data['new_password'])
                user.save()
                return Response({"detail": "Tu contraseña ha sido restablecida con éxito."}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "El enlace de recuperación es inválido o ha expirado."}, 
                                status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)