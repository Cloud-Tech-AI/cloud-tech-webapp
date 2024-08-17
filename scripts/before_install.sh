#!/bin/bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 851725593378.dkr.ecr.ap-south-1.amazonaws.com
 
docker pull 851725593378.dkr.ecr.ap-south-1.amazonaws.com/cloudtech:latest
