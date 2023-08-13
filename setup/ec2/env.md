# DJANGO SETTINGS
SECRET_KEY=<YOUR_SECRET_KEY>
DEBUG=False

# CSRF SETTINGS
CSRF_TRUSTED_ORIGINS=https://cloudtechforall.ml,https://public.cloudtechforall.ml,https://member.cloudtechforall.ml,https://moderator.cloudtechforall.ml,https://hero.cloudtechforall.ml

# TENANT SETTINGS
TENANT_USERS_DOMAIN=*.cloudtechforall.ml
TENANT_BASE_URL=http://%s.cloudtechforall.ml
PUBLIC_URL=http://cloudtechforall.ml
PUBLIC_SCHEMA_NAME=public
PUBLIC_SCHEMA_DOMAIN=cloudtechforall.ml

# AWS RDS
DATABASE_NAME=cloudtech
DATABASE_USER=cloudtech
DATABASE_PASSWORD=cloudtech240199
DATABASE_HOST=cloudtech-db-1.cyulilaj20hr.ap-south-1.rds.amazonaws.com
DATABASE_PORT=5432

# AWS S3
S3_MEDIA_BUCKET=cloudtech-media-storage
S3_MEDIA_BUCKET_REGION=ap-south-1
S3_STATIC_BUCKET=cloudtech-static-storage
S3_STATIC_BUCKET_REGION=ap-south-1

# AWS SES
EMAIL_BACKEND=django_ses.SESBackend
DEFAULT_FROM_EMAIL=thecloudtechforall@gmail.com
SES_REGION=ap-south-1
SES_ENDPOINT_URL=email.ap-south-1.amazonaws.com

# REDIS
REDIS_HOST=cloud-tech-webapp_redis_1

