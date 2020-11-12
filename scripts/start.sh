#!/bin/bash
set -e
set -a 
source .env
set +a 
node src/server.js

