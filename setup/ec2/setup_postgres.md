## ONE TIME SETUP
### LOG INTO POSTGRESQL
```bash
sudo -u postgres -h <RDS-DB-endpoint> psql
```

### CREATE USER AND DATABASE
```bash
CREATE DATABASE your_database;
CREATE USER your_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE your_database TO your_user;
```