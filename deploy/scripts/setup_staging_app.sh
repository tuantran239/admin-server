#!/bin/sh

# Main script to setup and start the application.
# This script is run on the remote server.
set -e

cd /usr/app/admin-server

export $(grep -v '^#' .env | xargs)

docker rmi $CI_IMAGE_NAME

sudo docker compose -f docker-compose.staging.yml down

# Start application container(s).
sudo docker compose -f docker-compose.staging.yml up --build