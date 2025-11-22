from .models import User, Message
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = '__all__'
        
    def create(self, validated_data):
        return User.objects.create(**validated_data)
    
    def validate_user_type(self, value):
        if value not in [User.USER_TYPE_A, User.USER_TYPE_B]:
            raise serializers.ValidationError("Tipo de usuário inválido. Deve ser 'A' ou 'B'.")
        return value
    
class MessageSerializer(serializers.ModelSerializer):
    msg = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model=Message
        fields = '__all__'
        
    def create(self, validated_data):
        return Message.objects.create(**validated_data)
    
    def validate_description(self, value):
        if len(value) > 250:
            raise serializers.ValidationError("A mensagem não pode exceder 250 caracteres.")
        return value