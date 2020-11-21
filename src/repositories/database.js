const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient


let db

function getDB() {
  return db
}

async function initializeDB(config) {
  const connectionUrl = `mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}}`
  let client = await MongoClient.connect(connectionUrl, {useUnifiedTopology: true})
  db = client.db(config.DB_NAME)
  return db
}


module.exports = {
  initializeDB,
  getDB
}