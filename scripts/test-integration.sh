#!/bin/bash
set -e 
set -a 
source .env
source .env.test
set +a
set +e 

#start the server and move it background
node src/start.js &

#wait until the server is ready
#TODO: implement a readiness probe
until $(curl --output /dev/null --silent --fail ${SERVER_PROTOCOL}://${SERVER_ADDRESS}:${SERVER_PORT}/api/health/readiness); do
    printf 'Waiting for server to start\n'
    sleep 1
done

#run tests and remember the exit code
node node_modules/.bin/nyc mocha --exit --recursive test/integration --timeout 10000
testExitCode=$?

#kill all child_processes if they haven't exited
pkill -P $$

#exit with the text exit status
exit $testExitCode
