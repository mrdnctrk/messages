#!/bin/bash
#the directory containing the PARENT folder of where this script is located
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
set -e
set -a 
source .env
set +a 
docker run\
 --rm\
 -p ${MONGO_PORT}:27017\
 mongo
