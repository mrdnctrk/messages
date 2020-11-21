const createServer = require('./createServer')
const {initializeDB} = require('./repositories/database')
const logger = require('./helpers/logger')
const config = require('./config')

async function start() {
  try {
    await initializeDB(config)
    await createServer({port:config.SERVER_PORT})
  } catch(e) {
    logger.error(e)
    process.exit(1)
  }
}

start()
