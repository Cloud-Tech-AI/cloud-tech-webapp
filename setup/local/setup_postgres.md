# POSTGRESQL LOCAL SETUP
Steps to setup postgresql locally on ubuntu

## INSTALL POSTGRESQL
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

## START SERVICE
```bash
sudo service postgresql start
```

## LOG INTO POSTGRESQL
```bash
sudo -u postgres psql
```

## CREATE USER AND DATABASE
```bash
CREATE DATABASE your_database;
CREATE USER your_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE your_database TO your_user;
```