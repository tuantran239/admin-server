#!/bin/sh
set -e

touch .env

echo "# Starting additional CI variables" >> .env

echo CI_REGISTRY_PASSWORD=$CI_REGISTRY_PASSWORD >> .env
echo CI_REGISTRY_USER=$CI_REGISTRY_USER >> .env 
echo CI_REGISTRY=$CI_REGISTRY >> .env
echo CI_IMAGE_NAME=$CI_IMAGE_NAME >> .env

echo $CI_DEPLOY_ENV_VARS | base64 -d >> .env