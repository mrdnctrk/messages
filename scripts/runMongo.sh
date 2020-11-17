#!/bin/bash
#the directory containing the PARENT folder of where this script is located
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
set -e
set -a 
source .env
set +a 
docker run  -p 27017:27017 --name mongodb mongo 
docker run\
 --rm\
 -p ${MONGO_PORT}:27017\
 mongo
