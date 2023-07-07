FROM python:3.9.9-slim

COPY ./pyproject.toml ./poetry.lock /home/cloudtech/
WORKDIR /home/cloudtech

RUN apt update && \
    apt install -y redis-server && \
    apt install -y build-essential python3-dev && \
    pip install uWSGI && \
    pip install -U pip setuptools poetry && \
    poetry export -f requirements.txt --output requirements.txt --without-hashes && \
    pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./cloudtech_project ./cloudtech_project
COPY ./community ./community
COPY ./content ./content
COPY ./home ./home
COPY ./mixins ./mixins
COPY ./staticfiles ./staticfiles
COPY ./templates ./templates
COPY ./web ./web
COPY ./manage.py ./manage.py
COPY docker/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh && \
    rm -rf /root/.cache/pip

ENTRYPOINT ["./entrypoint.sh"]
