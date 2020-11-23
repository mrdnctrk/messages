**Build status**
main: 
[![Build Status](https://travis-ci.com/mrdnctrk/messages.svg?branch=main)](https://travis-ci.com/mrdnctrk/messages)

# Messages - A RESTful API Server using Node.js
This is a demo backend application to showcase RESTful API implementation using Node.js. It depends on Express.js and MongoDB.
It manages messages, specifically whether or not a message is a palindrome. The application supports the following operations:
- Create, retrieve, update, and delete a message
- List messages

# API Documentation
This project uses OpenApi Specification to document its endpoints. An offline version of the documentation can be seen by visiting following link at swagger.io:

https://petstore.swagger.io/?url=https://raw.githubusercontent.com/mrdnctrk/messages/main/src/apischemas/openapi.json

When you are running the project locally, a live version of the Swagger UI can be reached at http://localhost:5000/docs

# Overview of Architecture

![Architecture Diagram](https://i.imgur.com/ChmyMrq.png)

The application consists of 3 main layers as shown in the diagram above. 

* Controller layer handles the interaction with the HTTP client, i.e. requests and responses. Its responsibilities are creating a server instance listening on a specified port, request routing, request schema (body and parameters) validation, calling the related service layer to process the request and returning a response to the client. This is where Express web framework is used. The code for this layer is found under `src/server`.
* Service layer handles the processing related to the main purpose of the app, managing messages and their properties. It uses the persistence layer to save and retrieve data. The source code for this layer is in `src/services`.
* Persitence layer is responsible for persisting and retrieving data, in MongoDB in this case. The source code for this layer is found in `src/repositories`.

The separation of concern achieved by this structure allows modularity, code reuse and testability. For example, changing the controller layer, without touching the other two layers, will be enough to  serve this app on a serverless architecture or using a framework other than Express. Similarly, to use a database other than MongoDB, one just needs to change the persistence layer without touching other two layers. 


# How To Run

## Environment Variables

The API server needs the following environment variables to be available.
 Variable | Description |
| --- | --- |
| SERVER_PORT | The port the API server will listen on |
| MONGO_HOST | IP address or the hostname for the MongoDB instance to use |
| MONGO_PORT | The port for the MONGO_HOST |
| DB_NAME | The name of the db to persist data. It will be created if it doesn't exist |

You should create an .env file at the project root folder as shown below. 
```
SERVER_PORT=5000
MONGO_HOST=mongodb
MONGO_PORT=27017
DB_NAME=messages-db
```

## Run using docker-compose (Recommended)

In a development environment, it is recommended to run this project using `docker-compose`, as it requires minimal setup.  

1. Make sure you have `docker` and `docker-compose` installed. On Mac and Windows docker-compose is included with docker engine, on Linux it has to be installed separately.
2. Make sure you have an .env file at root of the project as in the example above, keep the values as is. 
3. In the root folder of the project, run the following commands:  
    * For the very first time:    
    `$ docker-compose build`    
    * Every time after that:  
     `$ docker-compose up`
    * The API server should now be running at http://localhost:5000.
    * To stop the services:    
      `CTRL+C` on the same terminal or `docker-compose stop` on another terminal. 
    * To stop and completely remove containers:   
      `docker-compose down`
      
### Run the tests locally
* `./scripts/test.sh` runs all tests (unit + integration), using docker-compose.
* `./scripts/test-unit.sh`runs unit tests only, using docker-compose

## Run without docker-compose
1. Make sure you have a live MongoDB instance and enter its address and port in the .env file. 
2. Make sure you have Node.js version 12 or later installed. 
2. Run either `npm run start` or `./scripts/start.sh`

# CI Integration

This project has Travis CI integration: https://travis-ci.com/github/mrdnctrk/messages

        
