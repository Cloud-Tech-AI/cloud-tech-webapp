#!/bin/bash

# navigate to the project directory
cd /root/cloud-tech-webapp

# List all files in the current directory
ls -a

# Execute the docker-compose commands
docker-compose down
docker-compose up -d
