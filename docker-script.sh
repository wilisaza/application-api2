#!/bin/sh

#Stop running container
docker stop $(docker ps -a -q  --filter ancestor=synchrox/app-service)

# Build container
docker build -t synchrox/app-service .

# Run container
docker run -p 6409:6409 -d synchrox/app-service