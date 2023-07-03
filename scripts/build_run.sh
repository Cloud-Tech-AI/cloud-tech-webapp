#!/bin/bash

# List all files in the current directory
ls -a

cd /home/ubuntu/cloud-tech-webapp

# List all files in the current directory
ls -a

# Execute the docker-compose commands

docker-compose down
docker-compose up
