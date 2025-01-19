# Build container
docker build . -t security-manager-bot:latest
# Tag
docker tag security-manager-bot:latest winty.io:5000/winty/security-manager-bot:latest
# Pushing
docker push winty.io:5000/winty/security-manager-bot:latest# Build container
