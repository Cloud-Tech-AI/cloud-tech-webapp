## ONE TIME SETUP
### LOG INTO POSTGRESQL
```bash
psql -U postgres -h <RDS-DB-endpoint> --password
```

### CREATE USER
```bash
CREATE ROLE new_user WITH LOGIN PASSWORD 'securepassword';
ALTER ROLE new_user CREATEDB;
ALTER ROLE new_user VALID UNTIL 'infinity';
```

### CREATE DATABASE
```bash
CREATE DATABASE your_database;
GRANT ALL PRIVILEGES ON DATABASE your_database TO your_user;
```