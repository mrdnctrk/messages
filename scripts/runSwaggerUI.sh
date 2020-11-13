#!/bin/bash
#the directory containing the PARENT folder of where this script is located
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
port=8181
echo "Swagger UI at http://localhost:${port}"
docker run\
 --rm\
 -p ${port}:8080\
 -e 'SWAGGER_JSON=/apischemas/openapi.json'\
 -v "${dir}/src/apischemas:/apischemas"\
 swaggerapi/swagger-ui
