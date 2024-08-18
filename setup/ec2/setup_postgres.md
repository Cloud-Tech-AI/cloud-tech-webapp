## ONE TIME SETUP
### LOG INTO POSTGRESQL
```bash
psql -U postgres -h <RDS-DB-endpoint> --password
```

### CREATE USER AND DATABASE
```bash
CREATE DATABASE your_database;
CREATE USER your_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE your_database TO your_user;
```