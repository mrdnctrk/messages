#!/bin/bash
#run tests and remember the exit code
node node_modules/.bin/nyc mocha --exit --recursive test/unit --timeout 10000

