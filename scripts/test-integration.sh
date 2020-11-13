#!/bin/bash
set -e
set -a 
source .env
set +a 
node node_modules/.bin/mocha --exit --recursive test/integration --timeout 10000

