FROM node:12-alpine

RUN mkdir -p /opt/app-root/
WORKDIR /opt/app-root/

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install --only=prod

COPY ./src ./src
COPY ./scripts ./scripts


ENV SERVER_PORT=5000\
    MONGO_HOST=host.docker.internal\
    MONGO_PORT=27017\
    DB_NAME=messages-db

CMD ["node", "./src/start.js"]

