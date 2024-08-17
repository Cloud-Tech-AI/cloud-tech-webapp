#!/bin/bash

# login as sudo user
sudo su -

# Update the system
apt update
apt upgrade -y

# Install Git
apt install -y git

# Install Docker
apt install -y docker.io

# Add the current user to the docker group
usermod -aG docker $USER

# Start the Docker service
service docker start

# Install Docker Compose
apt install -y docker-compose

# Install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install

# Install the CodeDeploy agent
apt install -y ruby
apt install -y wget
wget https://aws-codedeploy-us-west-2.s3.us-west-2.amazonaws.com/latest/install
chmod +x ./install
./install auto

# Clean up temporary files
rm -rf awscliv2.zip aws install

# Display installed versions
docker --version
docker-compose --version
aws --version

# Create directories
git clone https://github.com/Cloud-Tech-AI/cloud-tech-webapp.git

# Create .env file
touch .env  # add env variables as per your project requirements

# setup nginx
apt-get update
apt-get install nginx -y
systemctl nginx status
truncate -s 0 /etc/nginx/sites-available/default
config_block='
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name *.cloudtechforall.ml;

    listen 443 ssl;
    server_name cloudtechforall.ml *.cloudtechforall.ml; 
    ssl_certificate /etc/letsencrypt/live/cloudtechforall.ml/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cloudtechforall.ml/privkey.pem;

    location / {
        proxy_pass http://<EC2-public-ip>:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
'
echo  "$config_block" | tee -a /etc/nginx/sites-available/default
service nginx restart

# ssl cert using certbot
# apt install certbot python3-certbot-nginx
# certbot certonly --dns-route53 -d cloudtechforall.ml -d '*.cloudtechforall.ml' (route53 access to IAM attached to EC2)
