from .models import User, Message
from .serializers import UserSerializer, MessageSerializer
from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

@api_view(['POST', 'GET'])
def register_list_user(request):
    if request.method == 'POST':
        try:    
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    if request.method =='GET':
        try:
            user = User.objects.filter(user_type=request.user_type)
            if not user:
                raise ValidationError("Não existe usuário para listagem.")
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['POST', 'GET'])
def register_list_message(request):
    if request.method == 'POST':
        try:
            serializer = MessageSerializer(data=request.data)
            if serializer.is_valid():
                msg = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'GET':
        try:
            msg = get_object_or_404(Message, pk=User.user_type)
            if not msg:
                raise ValidationError("Não existe usuário para listagem.")
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)