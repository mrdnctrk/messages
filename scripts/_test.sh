#!/bin/bash

#the caller can specify which test folder to run
#by default everything under test/ is run
DIR_TO_TEST=${1:-test}

#run tests and remember the exit code
node \
  node_modules/.bin/nyc \
  --reporter=text-summary \
  --reporter=lcovonly \
  node \
  node_modules/.bin/mocha \
  --exit \
  --recursive \
  "${DIR_TO_TEST}"

testExitCode=$?

if [[ -n "${TRAVIS}" ]]; then
   echo 'Sending coverage results to coveralls'
   node node_modules/coveralls/bin/coveralls.js < coverage/lcov.info
fi

#kill all child_processes if they haven't exited
pkill -P $$

#exit with the text exit status
exit $testExitCode



