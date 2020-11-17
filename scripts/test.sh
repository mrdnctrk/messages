#!/bin/bash
#run tests and remember the exit code
node node_modules/.bin/nyc node_modules/.bin/mocha --exit --recursive test/unit --timeout 1000
testExitCode=$?

#kill all child_processes if they haven't exited
pkill -P $$

#exit with the text exit status
exit $testExitCode


