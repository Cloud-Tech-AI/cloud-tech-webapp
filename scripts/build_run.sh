#!/bin/bash

# change to the project directory
cd cloud-tech-webapp

# Update the repository
git pull

# List all files in the current directory
ls -a

# Execute the docker-compose commands
docker-compose down
docker-compose up -d
