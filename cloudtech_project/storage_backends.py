import os
from botocore.client import Config
from storages.backends.s3boto3 import S3Boto3Storage


class MediaStorage(S3Boto3Storage):
    bucket_name = os.getenv('S3_MEDIA_BUCKET')
    region_name = os.getenv('S3_MEDIA_BUCKET_REGION')
    config = Config(signature_version='s3v4',
                    s3={'addressing_style': 'path'},
                    max_pool_connections=100)


class StaticStorage(S3Boto3Storage):
    bucket_name = os.getenv('S3_STATIC_BUCKET')
    region_name = os.getenv('S3_STATIC_BUCKET_REGION')
    default_acl = 'public-read'
    querystring_auth = False
    file_overwrite = True
