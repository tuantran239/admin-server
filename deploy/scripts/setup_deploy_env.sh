#!/bin/sh
set -e

echo "# Starting additional CI variables" >> .env
echo $CI_DEPLOY_ENV_VARS | base64 -d >> .env