# DJANGO LOCAL SETUP
Steps to setup django locally on ubuntu

## INITIAL
'''bash
sudo apt-get install poetry
poetry install
'''

## TERMINAL 1
'''bash
python manage.py migrate
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic

python manage.py createsuperuser --username=<YOUR USERNAME>
python manage.py create_tenant --schema_name=member --name=member --domain-domain=member.<YOUR DOMAIN>:<PORT>
python manage.py create_tenant --schema_name=moderator --name=moderator --domain-domain=moderator.<YOUR DOMAIN>:<PORT>
python manage.py create_tenant --schema_name=hero --name=hero --domain-domain=hero.<YOUR DOMAIN>:<PORT>

python manage.py runserver
'''

## TERMINAL 2
'''bash
sudo systemctl start redis
'''


## TERMINAL 3
'''bash
celery -A cloudtech_project worker -l info
'''