const createServer = require('./createServer')
const config = require('./config')
createServer({port:config.SERVER_PORT})
