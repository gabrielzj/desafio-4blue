from .models import User, Message
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = '__all__'
        
    def create(self, validated_data):
        user_type = validated_data.get('user_type')
        if User.objects.filter(user_type=user_type).exists():
            raise serializers.ValidationError("Já existe um usuário com esse tipo.")
        return User.objects.create(**validated_data)
    
    def validate_user_type(self, value):
        if value not in [User.USER_TYPE_A, User.USER_TYPE_B]:
            raise serializers.ValidationError("Tipo de usuário inválido. Deve ser 'A' ou 'B'.")
        return value
    
class MessageSerializer(serializers.ModelSerializer):
    user_type = serializers.CharField(write_only=True, required=False)
    user_name = serializers.CharField(source='user.name', read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'description', 'user_name', 'user_type', 'system_response']
        extra_kwargs = { 'user': { 'read_only': True } }
        
    def create(self, validated_data):
        user_type = validated_data.pop('user_type', None)
        user = User.objects.filter(user_type=user_type).first()
        if not user:
            raise serializers.ValidationError("Nenhum usuário encontrado com esse tipo.")
        validated_data['user'] = user
        return Message.objects.create(**validated_data)
    
    def validate_description(self, value):
        if len(value) > 250:
            raise serializers.ValidationError("A mensagem não pode exceder 250 caracteres.")
        return value