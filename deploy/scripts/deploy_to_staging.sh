#!/bin/sh
CI_DEPLOY_USER="${CI_DEPLOY_USER:-root}"
CI_DEPLOY_SSH_PORT="${CI_DEPLOY_SSH_PORT:-22}"
CI_DEPLOY_HOST="$CI_DEPLOY_USER@$CI_DEPLOY_SERVER"

echo "-------------------------- Script File ---------------------------------"

# Copy necessary files to /app folder.
scp -o StrictHostKeyChecking=no -r -P $CI_DEPLOY_SSH_PORT \
  ./.env \
  ./docker-compose.staging.yml \
  ./deploy/scripts/setup_staging_app.sh \
  $CI_DEPLOY_HOST:/usr/app/admin-server

echo "-------------------------- Ssh Server ---------------------------------"

ssh -o StrictHostKeyChecking=no -p $CI_DEPLOY_SSH_PORT $CI_DEPLOY_HOST << 'EOF'
  set -e

  cd /usr/app/admin-server

  echo "----------Export environment variables--------"

  export $(grep -v '^#' .env | xargs)

  echo "--------Login to the container registry.-------"

  echo "$CI_REGISTRY_PASSWORD" | sudo docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY

  echo "---------Remove Image--------"

  if docker images -q "$CI_IMAGE_NAME"  > /dev/null; then
    docker rmi "$CI_IMAGE_NAME"
    echo "Image $CI_IMAGE_NAME deleted."
  else
    echo "Image $CI_IMAGE_NAME does not exist."
  fi
  
  echo "---------Set up application.--------"

  bash ./setup_staging_app.sh
EOF
