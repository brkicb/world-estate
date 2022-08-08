from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage


class StaticFileStorage(S3Boto3Storage):
  location = settings.AWS_STATIC_LOCATION
  default_acl = 'public-read'


class MediaFileStorage(S3Boto3Storage):
  custom_domain = None
  location = settings.AWS_PUBLIC_MEDIA_LOCATION
  default_acl = 'private'
  file_overwrite = False
  signature_version = 's3'
