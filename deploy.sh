#!/bin/bash

# Extrai a versão do package.json
VERSION=$(jq -r .version package.json)

# Verifica se a versão foi extraída corretamente
if [ -z "$VERSION" ]; then
  echo "Erro ao extrair a versão do package.json"
  exit 1
fi

echo "Versão do projeto: $VERSION"

# Build container
# quando a arquitetura for ARM, adicionar --platform linux/amd64
if [ "$(uname -m)" = "arm64" ]; then
  docker build --platform linux/amd64 -t security-manager-bot:latest .
else
  docker build -t security-manager-bot:latest .
fi

# Tag
docker tag security-manager-bot:latest winty.io:5000/winty/security-manager-bot:$VERSION
# Pushing
docker push winty.io:5000/winty/security-manager-bot:$VERSION # Build container
