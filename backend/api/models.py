from django.db import models

class User(models.Model):
    USER_TYPE_A = 'A'
    USER_TYPE_B = 'B'
    
    USER_TYPE_CHOICES = [
        (USER_TYPE_A, 'A'),
        (USER_TYPE_B, 'B'),
    ]
    
    name = models.CharField(max_length=100, verbose_name='Nome do Usuário')
    user_type = models.CharField(max_length=50, choices=USER_TYPE_CHOICES, verbose_name='Tipo de Usuário', blank=False, null=False)
    def __str__(self):
        return self.name
    
class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='message', verbose_name='Mensagem do Usuário')
    description = models.CharField(max_length=250)
    system_response = models.CharField(max_length=250, blank=True, null=True, verbose_name='Resposta do Sistema')