from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.core.mail import send_mail
from .serializers import ContactSerializer


class SendEmailView(APIView):
  def post(self, request):
    data = request.data

    serializer = ContactSerializer(data=data)

    if not serializer.is_valid():
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    subject = 'Contact Notification'

    validated_data = serializer.validated_data
    first_name = validated_data['first_name']
    email = validated_data['email']
    message = validated_data['message']

    body = f'Sender first name: {first_name}\n'
    body += f'Sender email: {email}\n\n'
    body += f'Message:\n\n{message}'

    try:
      send_mail(
        subject,
        body,
        settings.EMAIL_HOST_USER,
        [settings.EMAIL_HOST_USER]
      )

      return Response(
        {'success': 'Message sent'},
        status=status.HTTP_200_OK
      )
    except:
      return Response(
        {'error': 'Something went wrong when sending message'},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
      )
