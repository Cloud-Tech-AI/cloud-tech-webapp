#!/bin/bash

# List all files in the current directory
ls -a

# Execute the docker-compose commands
docker-compose down
docker-compose up -d
