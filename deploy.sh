# Build container
docker build . -t security-manager-bot:latest
# Tag
docker tag security-manager-bot:latest winty.io:5000/winty/security-manager-bot:1.1.0
# Pushing
docker push winty.io:5000/winty/security-manager-bot:1.1.0# Build container
