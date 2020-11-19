const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient


let db

function getDB() {
  return db
}

async function initializeDB(config) {
  if (!config.MONGO_HOST) {
    throw new Error('MONGO_HOST is not defined. Make sure to make it available as an env variable')
  }

  if (!config.MONGO_PORT) {
    throw new Error('MONGO_PORT is not defined. Make sure to make it available as an env variable')
  }

  const connectionUrl = `mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}}`
  let client = await MongoClient.connect(connectionUrl, {useUnifiedTopology: true})
  db = client.db(config.DB_NAME)
  return db
}


module.exports = {
  initializeDB,
  getDB
}