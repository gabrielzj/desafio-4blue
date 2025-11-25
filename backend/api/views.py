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
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
@api_view(['POST', 'GET'])
def register_list_message(request):
    if request.method == 'POST':
        try:
            serializer = MessageSerializer(data=request.data)
            if serializer.is_valid():
                msg = serializer.save()
                user = msg.user
                user_type = user.user_type
                user_response_msg = f"Obrigado por seu contato, {user.name} {user_type}. Em breve responderemos."
                
                msg.system_response = user_response_msg
                msg.save()
                return Response({'message': user_response_msg}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'GET':
        user_id = request.query_params.get('user_id')
        user_type = request.query_params.get('user_type')
        if user_id:
            messages = Message.objects.filter(user__id=user_id)
        elif user_type:
            if user_type not in ('A', 'B'):
                return Response({'error': 'user_type inválido. Use A ou B.'}, status=status.HTTP_400_BAD_REQUEST)
            messages = Message.objects.filter(user__user_type=user_type)
        else:
            messages = Message.objects.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)