#!/bin/bash
#caller can specify which tester service to run
#defaults to tester which runs all the test 
#the other option is unit-tester
SERVICE=${1:-tester}

docker-compose \
  -p ci \
  -f docker-compose.yml \
  -f docker-compose.test.yml \
  up \
  --abort-on-container-exit \
  --exit-code-from="${SERVICE}"\
  "${SERVICE}"
  
TEST_EXIT_CODE=$?

docker-compose -p ci down --remove-orphans

exit $TEST_EXIT_CODE

