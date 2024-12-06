#!/bin/sh
set -e

echo "# Starting additional CI variables" >> .env

CI_REGISTRY_PASSWORD=$CI_REGISTRY_PASSWORD
CI_REGISTRY_USER=$CI_REGISTRY_USER
CI_REGISTRY=$CI_REGISTRY

echo $CI_DEPLOY_ENV_VARS | base64 -d >> .env