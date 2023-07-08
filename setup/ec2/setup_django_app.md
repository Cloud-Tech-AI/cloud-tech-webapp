## ONE TIME SETUP
'''bash 
python manage.py migrate
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic

python manage.py createsuperuser --username=<YOUR USERNAME>
python manage.py create_tenant --schema_name=member --name=member --domain-domain=member.<YOUR DOMAIN>
python manage.py create_tenant --schema_name=moderator --name=moderator --domain-domain=moderator.<YOUR DOMAIN>
python manage.py create_tenant --schema_name=hero --name=hero --domain-domain=hero.<YOUR DOMAIN>
'''