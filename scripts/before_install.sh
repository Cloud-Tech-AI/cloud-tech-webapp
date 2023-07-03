#!/bin/bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 392488130328.dkr.ecr.ap-south-1.amazonaws.com
 
docker pull 392488130328.dkr.ecr.ap-south-1.amazonaws.com/cloudtech:latest
