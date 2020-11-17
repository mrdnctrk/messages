const createServer = require('./createServer')
const {initializeDB} = require('./repositories/database')
const config = require('./config')

async function start() {
  try {
    await initializeDB(config)
    await createServer({port:config.SERVER_PORT})
  } catch(e) {
    console.log(e)
    process.exit(1)
  }
}

start()
