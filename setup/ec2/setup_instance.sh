#!/bin/bash

# Update the system
sudo apt update
sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io

# Add the current user to the docker group
sudo usermod -aG docker $USER

# Start the Docker service
sudo service docker start

# Install Docker Compose
sudo apt install -y docker-compose

# Install AWS CLI v2
curl "https://d1vvhvl2y92vvt.cloudfront.net/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Install the CodeDeploy agent
sudo apt install -y ruby
sudo apt install -y wget
wget https://aws-codedeploy-us-west-2.s3.us-west-2.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto

# Clean up temporary files
rm -rf awscliv2.zip aws install

# Display installed versions
docker --version
docker-compose --version
aws --version

# Create directories
mkdir ~/cloud-tech-webapp
cd ~/cloud-tech-webapp
mkdir cloudtech_project
cd cloudtech_project

# Create .env file
touch .env

# setup nginx
sudo apt-get update
sudo apt-get install nginx -y
sudo rm -r /etc/nginx/sites-available/default
config_block='
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name *.cloudtechforall.ml;

    location / {
        uwsgi_pass 127.0.0.1:8000;
    }
}
'
echo "$config_block" | sudo tee -a /etc/nginx/sites-available/default
sudo service nginx restart
